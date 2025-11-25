import { API_CONFIG } from "./types";

class HttpClient {
  private baseURL: string;
  private timeout: number;

  constructor(
    baseURL: string = API_CONFIG.BASE_URL,
    timeout: number = API_CONFIG.TIMEOUT
  ) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      // Log response for debugging
      console.log(`[HTTP_CLIENT] 📡 ${options.method || "GET"} ${endpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
        // Try to get error message from response
        // Clone response first to avoid "already read" error
        const responseClone = response.clone();
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await responseClone.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            const text = await responseClone.text();
            if (text && text.length < 200) {
              errorMessage = text;
            }
          }
        } catch (e) {
          // Ignore errors when reading error response
        }

        throw new Error(errorMessage);
      }

      // Check content-type before parsing JSON
      const contentType = response.headers.get("content-type");
      let data: any;

      if (contentType && contentType.includes("application/json")) {
        try {
          const responseText = await response.text();
          if (!responseText || responseText.trim() === "") {
            throw new Error("Empty response from server");
          }

          // Remove BOM if present
          const cleanText = responseText.trim().replace(/^\uFEFF/, "");
          data = JSON.parse(cleanText);
        } catch (parseError: any) {
          console.error(
            `❌ [HTTP_CLIENT] JSON parse error for ${endpoint}:`,
            parseError
          );
          throw new Error(
            `Failed to parse JSON response: ${parseError.message}`
          );
        }
      } else {
        // Non-JSON response
        const text = await response.text();
        console.error(
          `❌ [HTTP_CLIENT] Non-JSON response for ${endpoint}:`,
          text.substring(0, 200)
        );
        throw new Error(`Server returned non-JSON response: ${contentType}`);
      }

      return data;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout");
        }
        // Log network errors
        if (
          error.message.includes("Failed to fetch") ||
          error.name === "TypeError"
        ) {
          console.error(`❌ [HTTP_CLIENT] Network error for ${endpoint}:`, {
            message: error.message,
            name: error.name,
            url: url,
          });
        }
        throw error;
      }
      throw new Error("Unknown error occurred");
    }
  }

  // ✅ Sửa tại đây: truyền options thay vì headers trực tiếp
  async get<T>(
    endpoint: string,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
      ...(options ?? {}),
    });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      ...(options ?? {}),
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      ...(options ?? {}),
    });
  }

  async delete<T>(
    endpoint: string,
    options?: { headers?: Record<string, string> }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...(options ?? {}),
    });
  }
}

export const httpClient = new HttpClient();
export { HttpClient };
