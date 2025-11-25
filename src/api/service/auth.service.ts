import { httpClient } from "../http-client";
import {
  ApiResponse,
  SellerTokenResponse,
  UserInfo,
  LoginRequest,
  RegisterRequest,
  SellerTokenRequest,
  API_CONFIG,
  ZALO_CONFIG,
} from "../types";
import { buildEndpoint, buildEndpointWithQuery } from "../utils/endpoint.util";
import { getUserInfo, getPhoneNumber, authorize } from "zmp-sdk";
import * as zmpApis from "zmp-sdk/apis";

// Type declaration cho getLoginCode nếu có trong runtime
declare module "zmp-sdk/apis" {
  export function getLoginCode(): Promise<{ code: string }>;
}

// Zalo Mini App SDK types
interface ZaloUserInfo {
  id: string; // Mã định danh duy nhất của người dùng trên Zalo (dùng trong Mini App)
  idByOA?: string; // ID dùng để gửi tin nhắn qua OA (không dùng cho Mini App)
  name: string; // Tên đầy đủ của người dùng
  avatar: string; // URL ảnh đại diện của người dùng
  birthday?: string; // Ngày sinh của người dùng (optional)
  gender?: string; // Giới tính của người dùng (optional)
  picture?: string; // URL ảnh đại diện (alias của avatar, optional)
}

// Auth Service
export class AuthService {
  // Validate zalo_user_id format and content
  private static validateZaloUserId(zaloUserId: string): boolean {
    if (!zaloUserId || typeof zaloUserId !== "string") {
      return false;
    }

    const trimmedId = zaloUserId.trim();

    // Check if empty after trimming
    if (trimmedId === "") {
      return false;
    }

    // Check if contains only valid characters (alphanumeric, underscore, dash)
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validPattern.test(trimmedId)) {
      return false;
    }

    // Check minimum length (Zalo IDs are usually longer)
    if (trimmedId.length < 3) {
      return false;
    }

    return true;
  }
  // Get Zalo User Info from SDK
  static async getZaloUserInfo(options?: {
    avatarSize?: "small" | "normal" | "large";
    autoRequestPermission?: boolean;
  }): Promise<ZaloUserInfo> {
    try {
      // Gọi getUserInfo với autoRequestPermission: true để tự động hiển thị popup xin quyền
      const response = await getUserInfo({
        autoRequestPermission: options?.autoRequestPermission ?? true,
        avatarType: options?.avatarSize ?? "normal", // Chọn kích thước avatar: "small", "normal", hoặc "large"
      });

      const zaloUser = response.userInfo;

      // Validate zalo_user_id is present and not empty
      // Dùng id (cho Mini App), KHÔNG dùng idByOA (chỉ dùng cho OA)
      if (!this.validateZaloUserId(zaloUser.id)) {
        throw new Error("Zalo user ID không hợp lệ hoặc trống");
      }

      return {
        id: zaloUser.id.trim(), // Dùng id cho Mini App (KHÔNG dùng idByOA)
        idByOA: (zaloUser as any).idByOA, // Lưu idByOA nếu có (chỉ dùng để gửi tin nhắn qua OA)
        name: zaloUser.name || "", // Fallback to empty string if name is missing
        avatar: zaloUser.avatar || (zaloUser as any).picture || "", // Use picture as fallback for avatar
        birthday: (zaloUser as any).birthday || undefined, // Optional field
        gender: (zaloUser as any).gender || undefined, // Optional field
        picture: (zaloUser as any).picture || zaloUser.avatar || undefined, // Optional field
      };
    } catch (error: any) {
      // Xử lý error code -1401: User từ chối cấp quyền
      if (error?.code === -1401 || error?.error === -1401) {
        console.error(
          "❌ [AUTH_SERVICE] User từ chối cấp quyền (error code: -1401)"
        );
        throw new Error("USER_DENIED_PERMISSION");
      }

      console.error("❌ Lỗi khi lấy Zalo user info:", error);
      throw error;
    }
  }

  // Get Seller Token
  static async getSellerToken(): Promise<SellerTokenResponse> {
    const payload: SellerTokenRequest = {
      username: API_CONFIG.SHOP_USERNAME,
      key: API_CONFIG.KEY_ID,
    };

    try {
      const endpoint = buildEndpoint("get-token-seller", undefined, true);

      // Log endpoint for debugging (always log in production để debug)
      console.log("[AUTH_SERVICE] Fetching seller token from:", endpoint);
      console.log("[AUTH_SERVICE] BASE_URL:", API_CONFIG.BASE_URL);
      console.log("[AUTH_SERVICE] Payload:", {
        username: API_CONFIG.SHOP_USERNAME,
        key: API_CONFIG.KEY_ID,
      });

      // Thử fetch với các options khác nhau để handle CORS
      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          mode: "cors", // Explicitly enable CORS
          credentials: "omit", // Don't send credentials to avoid CORS issues
        });
      } catch (fetchError: any) {
        // Log chi tiết lỗi fetch
        const isNetworkError =
          fetchError?.name === "TypeError" ||
          fetchError?.message?.includes("Failed to fetch");

        console.error("[AUTH_SERVICE] ❌ Fetch error details:", {
          message: fetchError?.message,
          name: fetchError?.name,
          cause: fetchError?.cause,
          endpoint: endpoint,
          isNetworkError: isNetworkError,
        });

        // Re-throw với message rõ ràng hơn nhưng preserve error type
        if (
          isNetworkError ||
          fetchError?.message?.includes("Failed to fetch")
        ) {
          const networkError = new Error(
            `Không thể kết nối đến API: ${endpoint}. Có thể do CORS hoặc network bị chặn. Kiểm tra lại cấu hình Zalo Mini App whitelist.`
          );
          // Preserve error type để detection sau này vẫn hoạt động
          (networkError as any).name = fetchError?.name || "TypeError";
          (networkError as any).isNetworkError = true;
          throw networkError;
        }
        throw fetchError;
      }

      // Log tất cả headers để debug
      const allHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        allHeaders[key] = value;
      });

      let responseData;
      let textResponse;

      const responseClone = response.clone();

      try {
        responseData = await response.json();
        // Log response data để debug (không log token)
      } catch (jsonError) {
        try {
          textResponse = await responseClone.text();
        } catch (textError) {
          textResponse = "Unable to read response";
        }
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }

      // Ưu tiên lấy token từ response body (vì API trả về token trong body)
      // Sau đó mới thử từ header nếu body không có
      let sellerToken =
        responseData?.data?.seller_token ||
        responseData?.seller_token ||
        responseData?.token ||
        responseData?.data?.token ||
        response.headers.get("Token-Seller") ||
        response.headers.get("token-seller") ||
        response.headers.get("TOKEN-SELLER");

      if (!response.ok) {
        // Handle 403 Forbidden - usually means endpoint doesn't exist or CORS/proxy issue
        if (response.status === 403) {
          const errorMessage = `HTTP 403 Forbidden: Endpoint không hợp lệ hoặc bị chặn. Kiểm tra lại endpoint: ${endpoint}`;
          console.error("[AUTH_SERVICE] ❌ API trả về 403 Forbidden:", {
            status: response.status,
            statusText: response.statusText,
            endpoint: endpoint,
            message: "Có thể là lỗi proxy/CORS hoặc endpoint không tồn tại",
            responseText: textResponse?.substring(0, 200), // Log first 200 chars
          });
          throw new Error(errorMessage);
        }

        const errorMessage = `HTTP ${response.status}: ${
          responseData?.message || response.statusText || "Unknown error"
        }`;
        console.error("[AUTH_SERVICE] ❌ API trả về lỗi:", {
          status: response.status,
          statusText: response.statusText,
          message: responseData?.message,
          data: responseData,
        });
        throw new Error(errorMessage);
      }

      if (!sellerToken) {
        console.error(
          "[AUTH_SERVICE] ❌ Không tìm thấy Token-Seller trong headers hoặc response body"
        );
        const errorHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          errorHeaders[key] = value;
        });
        console.error("[AUTH_SERVICE] Response details:", {
          headers: errorHeaders,
          body: responseData,
        });
        throw new Error(
          "Không nhận được Token-Seller từ header hoặc response body"
        );
      }

      // Lưu token và Shop-Id vào localStorage ngay sau khi lấy được
      localStorage.setItem("sellerToken", sellerToken);
      localStorage.setItem("Shop-Id", API_CONFIG.KEY_ID);
      console.log(`[AUTH_SERVICE] ✅ Đã lưu sellerToken và Shop-Id: ${API_CONFIG.KEY_ID}`);

      const result: SellerTokenResponse = {
        status: responseData.status || responseData?.status || "success",
        message: responseData.message || responseData?.message || "Success",
        data: {
          seller_token: sellerToken,
          shop: responseData.data?.shop || responseData?.shop || 0,
          shop_setting:
            responseData.data?.shop_setting || responseData?.shop_setting || [],
          bank_accounts:
            responseData.data?.bank_accounts ||
            responseData?.bank_accounts ||
            [],
        },
      };

      return result;
    } catch (error: any) {
      // Log detailed error information for debugging
      const errorInfo = {
        message: error?.message,
        name: error?.name,
        endpoint: buildEndpoint("get-token-seller", undefined, true),
        baseURL: API_CONFIG.BASE_URL,
        isNetworkError:
          error?.name === "TypeError" ||
          error?.message?.includes("Failed to fetch"),
        suggestion: error?.message?.includes("Failed to fetch")
          ? "Có thể cần: 1) Whitelist domain trong Zalo Mini App settings, 2) Kiểm tra CORS headers trên server, 3) Đảm bảo API server cho phép request từ Zalo Mini App domain"
          : "Kiểm tra lại endpoint và payload",
      };

      console.error("[AUTH_SERVICE] ❌ Lỗi khi lấy seller token:", errorInfo);
      throw error;
    }
  }

  // Login with Zalo user info and Seller Token
  static async loginWithZalo(
    zaloUser: ZaloUserInfo,
    sellerToken: string
  ): Promise<ApiResponse<UserInfo>> {
    // Validate zalo_user_id before proceeding
    if (!this.validateZaloUserId(zaloUser.id)) {
      throw new Error("Zalo user ID không hợp lệ");
    }

    const loginData: LoginRequest = {
      zalo_user_id: zaloUser.id.trim(), // Primary identifier - MUST be present
      name: zaloUser.name || "", // Optional - can be empty
      avatar: zaloUser.avatar || "", // Optional - can be empty
      gender: zaloUser.gender || "", // Use gender from Zalo SDK
    };

    try {
      const endpoint = buildEndpoint("login", undefined, false);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Token-Seller": sellerToken,
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();
      const userToken = response.headers.get("Token-Seller");

      if (response.status === 404) {
        throw new Error("USER_NOT_FOUND");
      }

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${responseData.message || "Unknown error"}`
        );
      }

      if (!userToken) {
        throw new Error("Không nhận được Token từ header");
      }

      console.log("🔑 [AUTH_SERVICE] User Token:", userToken);

      const result: ApiResponse<UserInfo> = {
        success: responseData.success,
        message: responseData.message,
        token: userToken,
        data: responseData.data,
      };

      return result;
    } catch (error) {
      console.error(
        "❌ [AUTH_SERVICE] Login failed for zalo_user_id:",
        loginData.zalo_user_id,
        error
      );
      throw error;
    }
  }

  // Register with Zalo user info, Seller Token and Shop ID
  static async registerWithZalo(
    zaloUser: ZaloUserInfo,
    sellerToken: string,
    shopId: number,
    additionalData?: {
      email?: string;
      mobile?: string;
    }
  ): Promise<ApiResponse<UserInfo>> {
    // Validate zalo_user_id before proceeding
    if (!this.validateZaloUserId(zaloUser.id)) {
      throw new Error("Zalo user ID không hợp lệ");
    }

    const registerData: RegisterRequest = {
      zalo_user_id: zaloUser.id.trim(), // Primary identifier - MUST be present
      name: zaloUser.name || "", // Optional - can be empty
      avatar: zaloUser.avatar || "", // Optional - can be empty
      gender: zaloUser.gender || "", // Use gender from Zalo SDK
      email: additionalData?.email || "", // Optional
      mobile: additionalData?.mobile || "", // Optional
    };

    try {
      const endpoint = buildEndpoint("register", undefined, false);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Token-Seller": sellerToken,
          "Shop-ID": shopId.toString(),
        },
        body: JSON.stringify(registerData),
      });

      const responseData = await response.json();
      const userToken = response.headers.get("Token-Seller");

      if (response.status === 409) {
        throw new Error("USER_ALREADY_EXISTS");
      }

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${responseData.message || "Unknown error"}`
        );
      }

      if (!userToken) {
        throw new Error("Không nhận được Token từ header");
      }

      console.log("🔑 [AUTH_SERVICE] User Token:", userToken);

      const result: ApiResponse<UserInfo> = {
        success: responseData.success,
        message: responseData.message,
        token: userToken,
        data: responseData.data,
      };

      return result;
    } catch (error) {
      console.error(
        "❌ [AUTH_SERVICE] Register failed for zalo_user_id:",
        registerData.zalo_user_id,
        error
      );
      throw error;
    }
  }

  // Xin quyền số điện thoại từ user - chỉ để test
  static async requestPhonePermission(): Promise<any> {
    try {
      const result = await getPhoneNumber();
      return result;
    } catch (error: any) {
      console.error("❌ [AUTH_SERVICE] User từ chối hoặc lỗi:", error);
      throw error;
    }
  }

  // Xin quyền truy cập thông tin user cơ bản
  static async requestUserInfoPermission(): Promise<boolean> {
    try {
      const result = await authorize({
        scopes: ["scope.userInfo"],
      });

      return true;
    } catch (error: any) {
      // Xử lý error code -1401: User từ chối cấp quyền
      if (error?.code === -1401 || error?.error === -1401) {
        console.error(
          "❌ [AUTH_SERVICE] User từ chối cấp quyền (error code: -1401)"
        );
        throw new Error("USER_DENIED_PERMISSION");
      }

      console.error(
        "❌ [AUTH_SERVICE] User declined basic info permission:",
        error
      );
      return false;
    }
  }

  // Complete Zalo authentication flow via login code -> server
  // Fallback: Nếu không có getLoginCode, dùng getUserInfo + gửi lên backend
  static async authenticateWithZalo(
    shopId: number = parseInt(API_CONFIG.KEY_ID),
    options?: {
      requestPhone?: boolean;
      requestUserInfo?: boolean;
      email?: string;
      avatarSize?: "small" | "normal" | "large";
      autoRequestPermission?: boolean;
      phone_token?: string; // Truyền phone_token trực tiếp (từ LoginModal)
      birthday?: string; // Truyền birthday trực tiếp (từ LoginModal)
    }
  ): Promise<{
    success: boolean;
    user?: UserInfo;
    token?: string;
    isNewUser?: boolean;
    error?: string;
  }> {
    try {
      // 1) Thử dùng getLoginCode (nếu có) HOẶC fallback về getUserInfo
      let code: string | null = null;
      let zaloUser: ZaloUserInfo | null = null;
      let accessToken: string | null = null; // Lưu access_token nếu có

      // Thử getLoginCode trước (QUAN TRỌNG: Cần code để backend có thể decode phone_token)
      try {
        if (
          (zmpApis as any).getLoginCode &&
          typeof (zmpApis as any).getLoginCode === "function"
        ) {
          const codeResp = await (zmpApis as any).getLoginCode();
          code = codeResp?.code || codeResp || null;
          if (code && typeof code === "string") {
            console.log(
              "✅ [AUTH_SERVICE] Lấy được login code từ getLoginCode"
            );
            // Nếu có code, backend sẽ tự động exchange code để lấy access_token và decode phone_token
            // Thử lấy access_token từ response nếu có (mặc dù thường không có)
            if (codeResp?.access_token) {
              accessToken = codeResp.access_token;
              console.log(
                "✅ [AUTH_SERVICE] Lấy được access_token từ getLoginCode response"
              );
            }
          } else {
            console.warn(
              "⚠️ [AUTH_SERVICE] getLoginCode không trả về code hợp lệ"
            );
          }
        } else {
          console.warn("⚠️ [AUTH_SERVICE] getLoginCode không có trong SDK");
        }
      } catch (codeError: any) {
        console.warn(
          "⚠️ [AUTH_SERVICE] getLoginCode lỗi, fallback về getUserInfo:",
          codeError.message
        );
        console.warn(
          "⚠️ [AUTH_SERVICE] Lưu ý: Không có code sẽ không thể decode phone_token trong fallback mode"
        );
      }

      // Nếu không có code, fallback về getUserInfo
      if (!code) {
        console.log(
          "🔄 [AUTH_SERVICE] Fallback: Dùng getUserInfo thay vì getLoginCode"
        );

        // Lấy thông tin user từ Zalo SDK
        // Nếu autoRequestPermission: true, thử gọi với false trước để tránh popup thừa
        let userInfoRetrieved = false;
        if (options?.autoRequestPermission && options?.requestUserInfo) {
          try {
            // Thử lấy userInfo với autoRequestPermission: false trước
            // Nếu đã có quyền rồi, sẽ không hiện popup
            zaloUser = await this.getZaloUserInfo({
              autoRequestPermission: false, // Thử không popup trước
              avatarSize: options?.avatarSize ?? "normal",
            });
            userInfoRetrieved = true;
            console.log(
              "✅ [AUTH_SERVICE] UserInfo đã có quyền, không cần popup"
            );
          } catch (noPermissionError: any) {
            // Nếu không có quyền (error code -1401), mới xin quyền
            if (
              noPermissionError?.code === -1401 ||
              noPermissionError?.error === -1401 ||
              noPermissionError?.message?.includes("permission") ||
              noPermissionError?.message?.includes("quyền")
            ) {
              console.log(
                "⚠️ [AUTH_SERVICE] Chưa có quyền, sẽ xin quyền userInfo"
              );
              // Xin quyền user info (nếu cần)
              try {
                await this.requestUserInfoPermission();
              } catch (permError) {
                // Ignore permission error, tiếp tục
              }
            } else {
              // Nếu là lỗi khác, throw lại
              throw noPermissionError;
            }
          }
        }

        // Nếu chưa lấy được userInfo, thử lại với autoRequestPermission
        if (!userInfoRetrieved) {
          try {
            const userInfoResponse = await getUserInfo({
              autoRequestPermission: options?.autoRequestPermission ?? true,
              avatarType: options?.avatarSize ?? "normal",
            });
            zaloUser = {
              id: userInfoResponse.userInfo.id,
              idByOA: (userInfoResponse.userInfo as any).idByOA,
              name: userInfoResponse.userInfo.name || "",
              avatar:
                userInfoResponse.userInfo.avatar ||
                (userInfoResponse.userInfo as any).picture ||
                "",
              birthday:
                (userInfoResponse.userInfo as any).birthday || undefined,
              gender: (userInfoResponse.userInfo as any).gender || undefined,
            };
            // Thử lấy access_token từ response nếu có
            if ((userInfoResponse as any).access_token) {
              accessToken = (userInfoResponse as any).access_token;
              console.log(
                "✅ [AUTH_SERVICE] Lấy được access_token từ getUserInfo response"
              );
            }
          } catch (userInfoError: any) {
            if (userInfoError?.message === "USER_DENIED_PERMISSION") {
              return {
                success: false,
                error: "Người dùng đã từ chối cấp quyền truy cập thông tin.",
              };
            }
            throw userInfoError;
          }
        } else {
          // Nếu đã lấy được userInfo ở trên, thử lấy access_token từ response
          try {
            const userInfoResponse = await getUserInfo({
              autoRequestPermission: false,
              avatarType: options?.avatarSize ?? "normal",
            });
            if ((userInfoResponse as any).access_token) {
              accessToken = (userInfoResponse as any).access_token;
              console.log(
                "✅ [AUTH_SERVICE] Lấy được access_token từ getUserInfo response (lần 2)"
              );
            }
          } catch (e) {
            // Ignore error, không block flow
          }
        }
      }

      // 2) Call backend endpoint auth-by-code
      // Backend sẽ xử lý cả 2 trường hợp: có code hoặc có user info
      const endpoint = buildEndpoint("auth-by-code");

      // Nếu có code, gửi code. Nếu không, gửi user info (backend sẽ xử lý)
      const requestBody: any = {
        zalo_app_id: ZALO_CONFIG.APP_ID,
        zalo_app_secret: ZALO_CONFIG.APP_SECRET,
        zalo_token_url: ZALO_CONFIG.TOKEN_URL,
        zalo_profile_url: ZALO_CONFIG.PROFILE_URL,
      };

      if (code) {
        requestBody.code = code;
      } else if (zaloUser) {
        // Fallback: gửi user info thay vì code
        requestBody.zalo_user_id = zaloUser.id;
        requestBody.name = zaloUser.name;
        requestBody.avatar = zaloUser.avatar;
        requestBody.gender = zaloUser.gender || "";
        requestBody.birthday = zaloUser.birthday || "";
      } else {
        throw new Error("Không lấy được code hoặc user info từ Zalo");
      }

      // Gửi access_token nếu có (để backend decode phone_token)
      if (accessToken) {
        requestBody.access_token = accessToken;
        console.log(
          "✅ [AUTH_SERVICE] Access token included:",
          accessToken.substring(0, 20) + "..."
        );
      } else {
        console.warn(
          "⚠️ [AUTH_SERVICE] No access_token available. Phone token may not be decoded in fallback mode."
        );
      }

      // Gửi phone_token nếu có (từ options.phone_token hoặc requestPhone)
      if (options?.phone_token) {
        // Nếu có phone_token trực tiếp (từ LoginModal), dùng luôn
        requestBody.phone_token = options.phone_token;
        console.log(
          "✅ [AUTH_SERVICE] Phone token included from options:",
          options.phone_token.substring(0, 20) + "..."
        );
      } else if (options?.requestPhone) {
        // Nếu không có, thử lấy phone token
        try {
          console.log(
            "🔍 [AUTH_SERVICE] Requesting phone token from getPhoneNumber()..."
          );
          const phoneResponse = await getPhoneNumber();
          console.log(
            "📱 [AUTH_SERVICE] getPhoneNumber response:",
            phoneResponse
          );

          // Xử lý nhiều format response
          if (phoneResponse?.token) {
            requestBody.phone_token = phoneResponse.token;
            console.log(
              "✅ [AUTH_SERVICE] Phone token included from getPhoneNumber (token field):",
              requestBody.phone_token.substring(0, 20) + "..."
            );
          } else if (phoneResponse?.phone_token) {
            requestBody.phone_token = phoneResponse.phone_token;
            console.log(
              "✅ [AUTH_SERVICE] Phone token included from getPhoneNumber (phone_token field):",
              requestBody.phone_token.substring(0, 20) + "..."
            );
          } else {
            console.warn("⚠️ [AUTH_SERVICE] getPhoneNumber returned no token");
            console.warn(
              "⚠️ [AUTH_SERVICE] Response keys:",
              Object.keys(phoneResponse || {})
            );
            if (phoneResponse?.number) {
              console.warn(
                "⚠️ [AUTH_SERVICE] getPhoneNumber returned number directly (dev mode?):",
                phoneResponse.number
              );
            }
          }
        } catch (phoneError: any) {
          console.warn(
            "⚠️ [AUTH_SERVICE] Could not get phone token:",
            phoneError
          );
          // Không block flow nếu không lấy được phone token
        }
      } else {
        console.log(
          "ℹ️ [AUTH_SERVICE] No phone_token in options and requestPhone is false"
        );
      }

      // Log để debug
      if (requestBody.phone_token) {
        console.log(
          "📤 [AUTH_SERVICE] Sending phone_token to backend:",
          requestBody.phone_token.substring(0, 20) + "..."
        );
      } else {
        console.warn("⚠️ [AUTH_SERVICE] No phone_token to send to backend");
      }

      // Gửi birthday nếu có (từ options)
      if (options?.birthday) {
        requestBody.birthday = options.birthday;
        console.log("✅ [AUTH_SERVICE] Birthday included from options");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Shop-ID": String(
            Number.isFinite(shopId) ? shopId : parseInt(API_CONFIG.KEY_ID)
          ),
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json().catch(() => ({}));
      const userToken = response.headers.get("Token-Seller") || data.token;

      if (!response.ok) {
        throw new Error(data?.message || `HTTP ${response.status}`);
      }
      if (!userToken || !data?.data) {
        throw new Error("Thiếu token hoặc dữ liệu người dùng");
      }

      // 3) Store session
      this.storeAuthData(data.data, userToken);

      return {
        success: true,
        user: data.data,
        token: userToken,
        isNewUser: false,
      };
    } catch (error: any) {
      console.error("❌ [AUTH_SERVICE] Authentication failed:", error);
      return {
        success: false,
        error: error?.message || "Xác thực thất bại. Vui lòng thử lại.",
      };
    }
  }

  // Get user profile with token - endpoint: /mini-app/v1/get-profile
  static async getUserProfile(token: string): Promise<ApiResponse<UserInfo>> {
    try {
      const endpoint = buildEndpoint("get-profile");
      console.log("🔍 [AUTH_SERVICE] Getting user profile from:", endpoint);

      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (fetchError: any) {
        // Handle network errors (server down, CORS, etc.)
        if (
          fetchError?.message?.includes("Failed to fetch") ||
          fetchError?.name === "TypeError" ||
          fetchError?.message?.includes("NetworkError")
        ) {
          throw new Error(
            "Network error: Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
          );
        }
        throw fetchError;
      }

      let responseData: any;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        // Handle JSON parse errors
        throw new Error(
          `Invalid response from server: ${response.status} ${response.statusText}`
        );
      }

      if (!response.ok) {
        // Log only if not 401 (unauthorized is expected when token expires)
        if (response.status !== 401) {
          console.error(`❌ [AUTH_SERVICE] Failed to get user profile:`, {
            status: response.status,
            message: responseData.message || "Unknown error",
            data: responseData,
          });
        }
        throw new Error(
          `HTTP ${response.status}: ${responseData.message || "Unknown error"}`
        );
      }

      if (import.meta.env.DEV) {
        console.log("✅ [AUTH_SERVICE] User profile data:", responseData);
      }

      const result: ApiResponse<UserInfo> = {
        success: responseData.success || true,
        message: responseData.message || "Success",
        data: responseData.data || responseData, // API có thể trả về data trực tiếp hoặc trong field data
      };

      return result;
    } catch (error: any) {
      // Network errors are expected and handled gracefully - log as warning
      if (
        error?.message?.includes("Network error") ||
        error?.message?.includes("không thể kết nối") ||
        error?.message?.includes("Failed to fetch") ||
        error?.message?.includes("NetworkError")
      ) {
        console.warn(
          "⚠️ [AUTH_SERVICE] Network error getting user profile (handled gracefully):",
          error.message
        );
      } else {
        // Log other errors as errors
        console.error("❌ [AUTH_SERVICE] Error getting user profile:", error);
      }
      throw error;
    }
  }

  // Verify token (if needed)
  static async verifyToken(token: string): Promise<ApiResponse<UserInfo>> {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpClient.get<ApiResponse<UserInfo>>("/verify-token", options);
  }

  // Logout (clear local storage)
  // Note: KHÔNG xóa sellerToken vì đó là token của shop, không phải của user
  static logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // KHÔNG xóa sellerToken - giữ lại để dùng cho các API công khai của shop
    // localStorage.removeItem("sellerToken");
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  // Get stored token
  static getStoredToken(): string | null {
    return localStorage.getItem("token");
  }

  // Get stored user
  static getStoredUser(): UserInfo | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  // Store authentication data
  static storeAuthData(
    user: UserInfo,
    token: string,
    sellerToken?: string
  ): void {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    if (sellerToken) {
      localStorage.setItem("sellerToken", sellerToken);
      // Lưu Shop-Id khi lưu sellerToken
      localStorage.setItem("Shop-Id", API_CONFIG.KEY_ID);
    }
  }

  // Test method to get Zalo user info only
  static async testGetZaloUserInfo(): Promise<void> {
    try {
      const zaloUser = await this.getZaloUserInfo();
    } catch (error) {
      console.error("❌ Test failed:", error);
    }
  }

  // Cập nhật số điện thoại sau khi user đồng ý
  static async updatePhoneNumber(
    userToken: string,
    phoneToken: string
  ): Promise<boolean> {
    try {
      const endpoint = buildEndpoint("update-phone");
      console.log("🔍 [AUTH_SERVICE] Updating phone number:", endpoint);

      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            phone_token: phoneToken, // Backend sẽ decode token này thành số thật
            zalo_app_id: ZALO_CONFIG.APP_ID,
            zalo_app_secret: ZALO_CONFIG.APP_SECRET,
          }),
        });
      } catch (fetchError: any) {
        if (
          fetchError?.message?.includes("Failed to fetch") ||
          fetchError?.name === "TypeError" ||
          fetchError?.message?.includes("NetworkError")
        ) {
          throw new Error(
            "Network error: Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
          );
        }
        throw fetchError;
      }

      let data: any;
      try {
        const responseText = await response.text();
        if (!responseText || responseText.trim() === "") {
          throw new Error("Empty response from server");
        }
        data = JSON.parse(responseText);
      } catch (jsonError: any) {
        console.error(
          "❌ [AUTH_SERVICE] Failed to parse JSON response:",
          jsonError
        );
        throw new Error(
          `Invalid response from server: ${response.status} ${response.statusText}`
        );
      }

      if (response.ok && data.success) {
        console.log("✅ [AUTH_SERVICE] Phone number updated successfully");
        return true;
      } else {
        console.error(
          "❌ [AUTH_SERVICE] Failed to update phone:",
          data.message || "Unknown error"
        );
        return false;
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Network error") ||
        error?.message?.includes("không thể kết nối") ||
        error?.message?.includes("Failed to fetch") ||
        error?.message?.includes("NetworkError")
      ) {
        console.warn(
          "⚠️ [AUTH_SERVICE] Network error updating phone (handled gracefully):",
          error.message
        );
      } else {
        console.error("❌ [AUTH_SERVICE] Error updating phone:", error);
      }
      return false;
    }
  }

  // Update user profile
  static async updateProfile(
    token: string,
    profileData: {
      name?: string;
      email?: string;
      mobile?: string;
      birthday?: string;
      gender?: string;
      address?: string;
    }
  ): Promise<ApiResponse<UserInfo>> {
    try {
      const endpoint = buildEndpoint("update-profile");
      console.log("🔍 [AUTH_SERVICE] Updating user profile:", endpoint);

      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        });
      } catch (fetchError: any) {
        // Handle network errors
        if (
          fetchError?.message?.includes("Failed to fetch") ||
          fetchError?.name === "TypeError" ||
          fetchError?.message?.includes("NetworkError")
        ) {
          throw new Error(
            "Network error: Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
          );
        }
        throw fetchError;
      }

      let responseData: any;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        throw new Error(
          `Invalid response from server: ${response.status} ${response.statusText}`
        );
      }

      if (!response.ok) {
        console.error(`❌ [AUTH_SERVICE] Failed to update profile:`, {
          status: response.status,
          message: responseData.message || "Unknown error",
          data: responseData,
        });
        throw new Error(
          `HTTP ${response.status}: ${responseData.message || "Unknown error"}`
        );
      }

      console.log(
        "✅ [AUTH_SERVICE] Profile updated successfully:",
        responseData
      );

      const result: ApiResponse<UserInfo> = {
        success: responseData.success || true,
        message: responseData.message || "Success",
        data: responseData.data || responseData,
      };

      return result;
    } catch (error: any) {
      // Network errors are expected and handled gracefully - log as warning
      if (
        error?.message?.includes("Network error") ||
        error?.message?.includes("không thể kết nối") ||
        error?.message?.includes("Failed to fetch") ||
        error?.message?.includes("NetworkError")
      ) {
        console.warn(
          "⚠️ [AUTH_SERVICE] Network error updating profile (handled gracefully):",
          error.message
        );
      } else {
        console.error("❌ [AUTH_SERVICE] Error updating profile:", error);
      }
      throw error;
    }
  }

  // Debug method to see all available fields from Zalo SDK
  static async debugZaloSDKResponse(): Promise<void> {
    try {
      const response = await getUserInfo();
    } catch (error) {
      console.error("❌ Debug failed:", error);
    }
  }

  // Upload avatar
  static async uploadAvatar(
    token: string,
    file: File
  ): Promise<ApiResponse<{ avatar: string; avatar_url: string }>> {
    try {
      const endpoint = buildEndpoint("upload-avatar");
      console.log("🔍 [AUTH_SERVICE] Uploading avatar to:", endpoint);

      const formData = new FormData();
      formData.append("avatar", file);

      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type, let browser set it with boundary for FormData
          },
          body: formData,
        });
      } catch (fetchError: any) {
        if (
          fetchError?.message?.includes("Failed to fetch") ||
          fetchError?.name === "TypeError" ||
          fetchError?.message?.includes("NetworkError")
        ) {
          throw new Error(
            "Network error: Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
          );
        }
        throw fetchError;
      }

      let responseData: any;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        throw new Error(
          `Invalid response from server: ${response.status} ${response.statusText}`
        );
      }

      if (!response.ok) {
        console.error(`❌ [AUTH_SERVICE] Failed to upload avatar:`, {
          status: response.status,
          message: responseData.message || "Unknown error",
          data: responseData,
        });
        throw new Error(
          `HTTP ${response.status}: ${responseData.message || "Unknown error"}`
        );
      }

      console.log(
        "✅ [AUTH_SERVICE] Avatar uploaded successfully:",
        responseData
      );

      const result: ApiResponse<{ avatar: string; avatar_url: string }> = {
        success: responseData.success || true,
        message: responseData.message || "Success",
        data: responseData.data || responseData,
      };

      return result;
    } catch (error: any) {
      if (
        error?.message?.includes("Network error") ||
        error?.message?.includes("không thể kết nối") ||
        error?.message?.includes("Failed to fetch") ||
        error?.message?.includes("NetworkError")
      ) {
        console.warn(
          "⚠️ [AUTH_SERVICE] Network error uploading avatar (handled gracefully):",
          error.message
        );
      } else {
        console.error("❌ [AUTH_SERVICE] Error uploading avatar:", error);
      }
      throw error;
    }
  }
}
