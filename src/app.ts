// React core
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Router
import router from "@/router";

// Shop Context Provider
import { ShopProvider } from "@/contexts/shop-context";

// ZaUI stylesheet
import "zmp-ui/zaui.css";
// Tailwind stylesheet
import "@/css/tailwind.scss";
// Your stylesheet
import "@/css/app.scss";

// Expose app configuration
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

// Mount the app with ShopProvider
try {
  const appElement = document.getElementById("app");
  if (!appElement) {
    throw new Error("App element not found");
  }
  
  const root = createRoot(appElement);
  root.render(
    createElement(ShopProvider, null, createElement(RouterProvider, { router }))
  );
} catch (error) {
  console.error("Failed to mount app:", error);
  // Show error message in app element
  const appElement = document.getElementById("app");
  if (appElement) {
    appElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Lỗi khởi tạo ứng dụng</h2>
        <p>Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
        <pre style="text-align: left; background: #f5f5f5; padding: 10px; margin-top: 20px; border-radius: 4px;">${error}</pre>
      </div>
    `;
  }
}
