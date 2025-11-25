/**
 * Launch Parameters Utility
 * Handles reading shop_id and account from Zalo Mini App launch parameters
 * 
 * Note: Zalo Mini App passes query parameters through the URL.
 * We parse them from window.location.search or from the hash if available.
 */

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
  USERNAME: "launch-username",
  LAUNCH_PARAMS: "launch-params",
};

/**
 * Parse query parameters from URL
 * Supports both window.location.search and hash-based params
 * @returns Parsed query parameters object
 */
function parseQueryParams(): Record<string, string> {
  const params: Record<string, string> = {};
  
  try {
    // Try to get from window.location.search first
    if (typeof window !== 'undefined' && window.location) {
      // Log current URL for debugging
      console.log("[LAUNCH_PARAMS] Current URL:", window.location.href);
      console.log("[LAUNCH_PARAMS] Search:", window.location.search);
      console.log("[LAUNCH_PARAMS] Hash:", window.location.hash);
      
      // Parse from search params
      if (window.location.search) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.forEach((value, key) => {
          params[key] = value;
          console.log(`[LAUNCH_PARAMS] Found param: ${key} = ${value}`);
        });
      }
      
      // Also check hash for query params (some Mini App implementations use hash)
      if (window.location.hash) {
        const hashMatch = window.location.hash.match(/\?([^#]+)/);
        if (hashMatch) {
          const hashParams = new URLSearchParams(hashMatch[1]);
          hashParams.forEach((value, key) => {
            // Only override if not already set from search
            if (!params[key]) {
              params[key] = value;
              console.log(`[LAUNCH_PARAMS] Found param from hash: ${key} = ${value}`);
            }
          });
        }
      }
      
      console.log("[LAUNCH_PARAMS] Parsed params:", params);
    }
  } catch (error) {
    console.error("[LAUNCH_PARAMS] Error parsing query params:", error);
  }
  
  return params;
}

/**
 * Get launch parameters from URL query string
 * Also checks window.APP_CONFIG or other global objects if available
 * @returns Launch parameters object with query params
 */
export function getLaunchParamsFromSDK(): LaunchParams {
  try {
    const queryParams = parseQueryParams();
    
    // Also check if params are available in global objects (some Mini App implementations)
    if (typeof window !== 'undefined') {
      // Check window.APP_CONFIG for launch params
      if ((window as any).APP_CONFIG?.launchParams) {
        const globalParams = (window as any).APP_CONFIG.launchParams;
        Object.assign(queryParams, globalParams);
      }
      
      // Check window.location for any additional params
      if ((window as any).location?.query) {
        Object.assign(queryParams, (window as any).location.query);
      }
    }
    
    return {
      query: queryParams,
    };
  } catch (error) {
    console.warn("[LAUNCH_PARAMS] Error getting launch params:", error);
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
    const username = launch?.query?.username || "";

    // Store in localStorage for later use
    if (shopId) {
      localStorage.setItem(STORAGE_KEYS.SHOP_ID, shopId);
      console.log("[LAUNCH_PARAMS] Stored shop_id:", shopId);
    }

    if (account) {
      localStorage.setItem(STORAGE_KEYS.ACCOUNT, account);
      console.log("[LAUNCH_PARAMS] Stored account:", account);
    }

    if (username) {
      localStorage.setItem(STORAGE_KEYS.USERNAME, username);
      console.log("[LAUNCH_PARAMS] Stored username:", username);
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
 * Get username from launch parameters
 * Priority: Launch params > localStorage > null
 * @returns username string or null
 */
export function getUsernameFromParams(): string | null {
  try {
    // First try to get from current launch params
    const launch = getLaunchParamsFromSDK();
    if (launch?.query?.username) {
      return launch.query.username;
    }

    // Fallback to localStorage
    const storedUsername = localStorage.getItem("launch-username");
    if (storedUsername) {
      return storedUsername;
    }

    return null;
  } catch (error) {
    console.warn("[LAUNCH_PARAMS] Error getting username:", error);
    // Fallback to localStorage
    return localStorage.getItem("launch-username");
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
  localStorage.removeItem(STORAGE_KEYS.USERNAME);
  localStorage.removeItem(STORAGE_KEYS.LAUNCH_PARAMS);
}

