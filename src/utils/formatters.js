// src/utils/formatters.js

/**
 * Format a timestamp to a human-readable date/time string
 * 
 * @param {string} timestamp - ISO timestamp string
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date/time string
 */
export const formatTimestamp = (timestamp, options = {}) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    
    // Default formatting options
    const defaultOptions = {
      dateStyle: 'medium',
      timeStyle: 'short'
    };
    
    // Merge default options with provided options
    const formattingOptions = { ...defaultOptions, ...options };
    
    return new Intl.DateTimeFormat('en-US', formattingOptions).format(date);
  };
  
  /**
   * Format a large number with thousands separators
   * 
   * @param {number} value - The number to format
   * @returns {string} - Formatted number
   */
  export const formatNumber = (value) => {
    if (value === undefined || value === null) return '';
    
    return new Intl.NumberFormat('en-US').format(value);
  };
  
  /**
   * Format bytes to a human-readable string
   * 
   * @param {number} bytes - The size in bytes
   * @param {number} decimals - Number of decimal places
   * @returns {string} - Formatted size string
   */
  export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  /**
   * Format milliseconds to a human-readable duration
   * 
   * @param {number} ms - Duration in milliseconds
   * @returns {string} - Formatted duration string
   */
  export const formatDuration = (ms) => {
    if (!ms) return '0s';
    
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    
    const parts = [];
    
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);
    
    return parts.join(' ');
  };
  
  /**
   * Truncate a string and add ellipsis if it exceeds maxLength
   * 
   * @param {string} str - The string to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} - Truncated string
   */
  export const truncateString = (str, maxLength = 50) => {
    if (!str) return '';
    
    if (str.length <= maxLength) return str;
    
    return str.substring(0, maxLength) + '...';
  };
  
  /**
   * Format a percentage value
   * 
   * @param {number} value - The percentage value (0-100)
   * @param {number} decimals - Number of decimal places
   * @returns {string} - Formatted percentage string
   */
  export const formatPercentage = (value, decimals = 1) => {
    if (value === undefined || value === null) return '';
    
    return value.toFixed(decimals) + '%';
  };
  
  /**
   * Format a severity level with proper capitalization
   * 
   * @param {string} severity - The severity level
   * @returns {string} - Formatted severity string
   */
  export const formatSeverity = (severity) => {
    if (!severity) return '';
    
    const severityMap = {
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      info: 'Info'
    };
    
    return severityMap[severity.toLowerCase()] || severity;
  };