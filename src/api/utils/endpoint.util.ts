/**
 * Endpoint Utility
 * Provides helper functions for building API endpoints consistently
 */

import { API_CONFIG } from '../types';

/**
 * Build API endpoint URL
 * Handles dev/prod differences automatically:
 * - Dev: /api/list-product-shop -> proxy to /mini-app/v1/list-product-shop
 * - Prod: https://api.socdo.vn/mini-app/v1/list-product-shop
 * 
 * @param path - API endpoint path (e.g., '/list-product-shop', 'get-profile')
 * @param queryParams - Optional query parameters
 * @param useMiniAppPrefix - Whether to use /mini-app/v1 prefix (default: true). 
 *                          Set to false for legacy endpoints like /get-token-seller, /login, /register
 * @returns Full endpoint URL
 */
export function buildEndpoint(
  path: string,
  queryParams?: Record<string, string | number | boolean>,
  useMiniAppPrefix: boolean = true
): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Build query string if params provided
  let queryString = '';
  if (queryParams && Object.keys(queryParams).length > 0) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    queryString = params.toString();
  }
  
  // Construct full URL
  // In dev: BASE_URL = "/api" -> proxy will rewrite to /mini-app/v1/... (if useMiniAppPrefix)
  // In prod: BASE_URL = "https://api.socdo.vn" -> need to add /mini-app/v1 (if useMiniAppPrefix)
  const isProduction = API_CONFIG.BASE_URL.startsWith('http');
  
  let fullPath: string;
  if (useMiniAppPrefix) {
    if (isProduction) {
      // Production: add /mini-app/v1 prefix
      fullPath = `/mini-app/v1/${cleanPath}`;
    } else {
      // Development: use /api prefix (will be proxied to /mini-app/v1)
      fullPath = `/${cleanPath}`;
    }
  } else {
    // Legacy endpoints without /mini-app/v1 prefix
    fullPath = `/${cleanPath}`;
  }
  
  return queryString 
    ? `${API_CONFIG.BASE_URL}${fullPath}?${queryString}`
    : `${API_CONFIG.BASE_URL}${fullPath}`;
}

/**
 * Build endpoint with existing query string
 * Use this when you already have a URLSearchParams object
 * 
 * @param path - API endpoint path
 * @param queryString - Query string (from URLSearchParams.toString())
 * @param useMiniAppPrefix - Whether to use /mini-app/v1 prefix (default: true)
 * @returns Full endpoint URL
 */
export function buildEndpointWithQuery(
  path: string,
  queryString?: string,
  useMiniAppPrefix: boolean = true
): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const isProduction = API_CONFIG.BASE_URL.startsWith('http');
  
  let fullPath: string;
  if (useMiniAppPrefix) {
    if (isProduction) {
      // Production: add /mini-app/v1 prefix
      fullPath = `/mini-app/v1/${cleanPath}`;
    } else {
      // Development: use /api prefix (will be proxied to /mini-app/v1)
      fullPath = `/${cleanPath}`;
    }
  } else {
    fullPath = `/${cleanPath}`;
  }
  
  const finalUrl = queryString 
    ? `${API_CONFIG.BASE_URL}${fullPath}?${queryString}`
    : `${API_CONFIG.BASE_URL}${fullPath}`;
  
  // Debug log in production to verify endpoint is built correctly
  if (isProduction && typeof console !== 'undefined') {
    console.log('[ENDPOINT_UTIL] Building endpoint:', {
      path,
      cleanPath,
      isProduction,
      useMiniAppPrefix,
      fullPath,
      baseURL: API_CONFIG.BASE_URL,
      finalUrl
    });
  }
  
  return finalUrl;
}

