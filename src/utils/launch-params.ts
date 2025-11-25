/**
 * Launch Parameters Utility
 * Handles reading shop_id and account from Zalo Mini App launch parameters
 */

import { getLaunchParams } from "zmp-sdk";

export interface LaunchParams {
  query?: {
    shop_id?: string;
    account?: string;
    [key: string]: string | undefined;
  };
  [key: string]: any;
}

const STORAGE_KEYS = {
  SHOP_ID: "launch-shop-id",
  ACCOUNT: "launch-account",
  LAUNCH_PARAMS: "launch-params",
};

/**
 * Get launch parameters from Zalo SDK
 * @returns Launch parameters object with query params
 */
export function getLaunchParamsFromSDK(): LaunchParams {
  try {
    const launch = getLaunchParams();
    return launch || { query: {} };
  } catch (error) {
    console.warn("[LAUNCH_PARAMS] Error getting launch params from SDK:", error);
    return { query: {} };
  }
}

/**
 * Initialize and store launch parameters
 * Should be called once when app starts
 */
export function initializeLaunchParams(): LaunchParams {
  try {
    const launch = getLaunchParamsFromSDK();
    const shopId = launch?.query?.shop_id || "";
    const account = launch?.query?.account || "";

    // Store in localStorage for later use
    if (shopId) {
      localStorage.setItem(STORAGE_KEYS.SHOP_ID, shopId);
      console.log("[LAUNCH_PARAMS] Stored shop_id:", shopId);
    }

    if (account) {
      localStorage.setItem(STORAGE_KEYS.ACCOUNT, account);
      console.log("[LAUNCH_PARAMS] Stored account:", account);
    }

    // Store full launch params
    localStorage.setItem(STORAGE_KEYS.LAUNCH_PARAMS, JSON.stringify(launch));

    return launch;
  } catch (error) {
    console.error("[LAUNCH_PARAMS] Error initializing launch params:", error);
    return { query: {} };
  }
}

/**
 * Get shop_id from launch parameters
 * Priority: Launch params > localStorage > null
 * @returns shop_id string or null
 */
export function getShopIdFromParams(): string | null {
  try {
    // First try to get from current launch params
    const launch = getLaunchParamsFromSDK();
    if (launch?.query?.shop_id) {
      return launch.query.shop_id;
    }

    // Fallback to localStorage
    const storedShopId = localStorage.getItem(STORAGE_KEYS.SHOP_ID);
    if (storedShopId) {
      return storedShopId;
    }

    return null;
  } catch (error) {
    console.warn("[LAUNCH_PARAMS] Error getting shop_id:", error);
    // Fallback to localStorage
    return localStorage.getItem(STORAGE_KEYS.SHOP_ID);
  }
}

/**
 * Get account from launch parameters
 * Priority: Launch params > localStorage > null
 * @returns account string or null
 */
export function getAccountFromParams(): string | null {
  try {
    // First try to get from current launch params
    const launch = getLaunchParamsFromSDK();
    if (launch?.query?.account) {
      return launch.query.account;
    }

    // Fallback to localStorage
    const storedAccount = localStorage.getItem(STORAGE_KEYS.ACCOUNT);
    if (storedAccount) {
      return storedAccount;
    }

    return null;
  } catch (error) {
    console.warn("[LAUNCH_PARAMS] Error getting account:", error);
    // Fallback to localStorage
    return localStorage.getItem(STORAGE_KEYS.ACCOUNT);
  }
}

/**
 * Get all launch parameters
 * @returns Full launch params object
 */
export function getAllLaunchParams(): LaunchParams {
  try {
    const launch = getLaunchParamsFromSDK();
    return launch;
  } catch (error) {
    console.warn("[LAUNCH_PARAMS] Error getting all launch params:", error);
    // Try to get from localStorage
    const stored = localStorage.getItem(STORAGE_KEYS.LAUNCH_PARAMS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return { query: {} };
      }
    }
    return { query: {} };
  }
}

/**
 * Clear stored launch parameters from localStorage
 */
export function clearLaunchParams(): void {
  localStorage.removeItem(STORAGE_KEYS.SHOP_ID);
  localStorage.removeItem(STORAGE_KEYS.ACCOUNT);
  localStorage.removeItem(STORAGE_KEYS.LAUNCH_PARAMS);
}

