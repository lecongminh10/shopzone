import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { getPhoneNumber } from "zmp-sdk/apis";
import { UserInfo } from "@/types";

export const userInfoKeyState = atom(0);

export const userInfoState = atom<Promise<UserInfo>>(async (get) => {
  get(userInfoKeyState);

  // Try to get user info from AuthService first
  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      const userData = JSON.parse(storedUser);
      
      // Convert to UserInfo format expected by the app
      return {
        id: userData.user_id?.toString() || userData.id || '',
        name: userData.name || '',
        avatar: userData.avatar || '',
        phone: userData.mobile || userData.phone || '',
        email: userData.email || '',
        address: userData.address || '',
      };
    }
  } catch (error) {
    console.warn('⚠️ [STATE] Error getting stored user from AuthService:', error);
  }

  // If no stored user data, return null instead of creating new user
  // Let AuthProvider handle authentication
  throw new Error('No user data available');
});

export const loadableUserInfoState = loadable(userInfoState);

export const phoneState = atom(async () => {
  let phone = "";
  try {
    const { token } = await getPhoneNumber({});
    // TODO: Decode token at server-side to get phone number
    // https://mini.zalo.me/documents/api/getPhoneNumber/
    // phone = await decodeToken(token);
  } catch (error) {
    console.warn('Failed to get phone number:', error);
  }
  return phone;
});

