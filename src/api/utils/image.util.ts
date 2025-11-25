/**
 * Image URL Utility
 * Normalizes image URLs to ensure they are valid full URLs
 */

/**
 * Normalize image URL to full URL format
 * Handles:
 * - Full URLs (https://socdo.vn/...)
 * - Protocol-relative URLs (//socdo.vn/...)
 * - Relative paths (/uploads/...)
 * - Empty/null/undefined values
 * 
 * @param url - Image URL (can be full URL, relative path, or empty)
 * @param baseUrl - Base URL for relative paths (default: https://socdo.vn)
 * @returns Normalized full URL or empty string
 */
export function normalizeImageUrl(
  url?: string | null,
  baseUrl: string = 'https://socdo.vn'
): string {
  // Return empty string for null/undefined/empty
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return '';
  }

  const trimmedUrl = url.trim();

  // Already a full URL (http:// or https://)
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
    return trimmedUrl;
  }

  // Protocol-relative URL (//example.com/...)
  if (trimmedUrl.startsWith('//')) {
    return `https:${trimmedUrl}`;
  }

  // Relative path - ensure it starts with /
  const normalizedPath = trimmedUrl.startsWith('/') 
    ? trimmedUrl 
    : `/${trimmedUrl}`;

  // Combine base URL with path
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Normalize multiple image URLs
 * @param urls - Array of image URLs
 * @param baseUrl - Base URL for relative paths
 * @returns Array of normalized URLs
 */
export function normalizeImageUrls(
  urls?: (string | null)[],
  baseUrl: string = 'https://socdo.vn'
): string[] {
  if (!urls || !Array.isArray(urls)) {
    return [];
  }

  return urls
    .map(url => normalizeImageUrl(url, baseUrl))
    .filter(url => url !== ''); // Remove empty URLs
}

