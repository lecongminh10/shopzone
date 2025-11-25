import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  getShopIdFromParams,
  getAccountFromParams,
  initializeLaunchParams,
  getAllLaunchParams,
} from '@/utils/launch-params';

export interface ShopInfo {
  shop_id: string | null;
  account: string | null;
  launchParams: any;
}

interface ShopContextType {
  shopInfo: ShopInfo;
  isLoading: boolean;
  refreshShopInfo: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

interface ShopProviderProps {
  children: ReactNode;
}

/**
 * Shop Provider Component
 * Manages shop_id and account from launch parameters
 * Should wrap the entire app to provide shop context
 */
export function ShopProvider({ children }: ShopProviderProps) {
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    shop_id: null,
    account: null,
    launchParams: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshShopInfo = () => {
    try {
      // Initialize launch params (reads from SDK and stores in localStorage)
      initializeLaunchParams();

      // Get shop_id and account
      const shopId = getShopIdFromParams();
      const account = getAccountFromParams();
      const allParams = getAllLaunchParams();

      setShopInfo({
        shop_id: shopId,
        account: account,
        launchParams: allParams,
      });

      console.log('[SHOP_CONTEXT] Shop info updated:', {
        shop_id: shopId,
        account: account,
        allParams: allParams,
      });
    } catch (error) {
      console.error('[SHOP_CONTEXT] Error refreshing shop info:', error);
      // Set default values to prevent blocking render
      setShopInfo({
        shop_id: null,
        account: null,
        launchParams: {},
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize on mount
  useEffect(() => {
    refreshShopInfo();
  }, []);

  const contextValue: ShopContextType = {
    shopInfo,
    isLoading,
    refreshShopInfo,
  };

  // Always render children, even when loading
  // This prevents blank screen issues
  return (
    <ShopContext.Provider value={contextValue}>
      {isLoading ? (
        // Show minimal loading state if needed, but still render children
        children
      ) : (
        children
      )}
    </ShopContext.Provider>
  );
}

/**
 * Custom hook to use shop context
 * @returns Shop context value
 * @throws Error if used outside ShopProvider
 */
export function useShop(): ShopContextType {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}

