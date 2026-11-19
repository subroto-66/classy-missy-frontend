import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../lib/axios";
import defaultLogo from "../assets/default/logo.svg";

const SettingsContext = createContext(null);

/**
 * Calculates high-contrast foreground color (#ffffff or #111111) for any hex background
 */
function getContrastColor(hexColor) {
  if (!hexColor || typeof hexColor !== "string") return "#ffffff";
  const hex = hexColor.replace("#", "");
  let fullHex = hex;
  if (hex.length === 3) {
    fullHex = hex.split("").map((c) => c + c).join("");
  }
  if (fullHex.length !== 6) return "#ffffff";
  const r = parseInt(fullHex.substring(0, 2), 16) || 0;
  const g = parseInt(fullHex.substring(2, 4), 16) || 0;
  const b = parseInt(fullHex.substring(4, 6), 16) || 0;
  // Standard YIQ brightness formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#111111" : "#ffffff";
}

/**
 * Helper to update or create an HTML <meta> tag
 */
function setMetaTag(attribute, attributeValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

/**
 * Helper to update or create an HTML <link rel="icon">
 */
function setFavicon(href) {
  if (!href) return;
  let link = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "shortcut icon";
    document.head.appendChild(link);
  }
  link.href = href;
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to resolve backend storage or relative URLs
  const resolveAssetUrl = useCallback((path, fallback = null) => {
    if (!path) return fallback;
    if (
      path.startsWith("http://") ||
      path.startsWith("https://") ||
      path.startsWith("blob:") ||
      path.startsWith("data:")
    ) {
      return path;
    }
    const backendBase = (
      import.meta.env.VITE_API_URL || "http://localhost:8000/api"
    ).replace(/\/api\/?$/, "");
    return `${backendBase}${path.startsWith("/") ? "" : "/"}${path}`;
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await api.get("/settings");
      if (response.data) {
        setSettings(response.data);
        applySettings(response.data);
      }
    } catch (err) {
      console.warn("Could not load storefront settings, using defaults.", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const applySettings = (data) => {
    if (!data) return;

    // 1. Apply Dynamic Primary Color to Tailwind / CSS Variables
    if (data.primary_color) {
      const primaryColor = data.primary_color;
      const primaryForeground = getContrastColor(primaryColor);
      document.documentElement.style.setProperty("--primary", primaryColor);
      document.documentElement.style.setProperty("--color-primary", primaryColor);
      document.documentElement.style.setProperty("--primary-foreground", primaryForeground);
      document.documentElement.style.setProperty("--color-primary-foreground", primaryForeground);
      try {
        localStorage.setItem("cm_primary_color", primaryColor);
      } catch (e) {}
    }

    // 2. Apply Dynamic Favicon
    if (data.favicon) {
      const resolvedFavicon = resolveAssetUrl(data.favicon, "/favicon.svg");
      setFavicon(resolvedFavicon);
    }

    // 3. Apply Document Title & Meta Tags
    if (data.meta_title || data.site_title) {
      document.title = data.meta_title || `${data.site_title} - ${data.site_tagline || "Fashion"}`;
      setMetaTag("property", "og:title", document.title);
      setMetaTag("name", "twitter:title", document.title);
    }

    if (data.meta_description) {
      setMetaTag("name", "description", data.meta_description);
      setMetaTag("property", "og:description", data.meta_description);
      setMetaTag("name", "twitter:description", data.meta_description);
    }

    if (data.meta_keywords) {
      setMetaTag("name", "keywords", data.meta_keywords);
    }

    if (data.meta_og_image) {
      const ogUrl = resolveAssetUrl(data.meta_og_image);
      setMetaTag("property", "og:image", ogUrl);
      setMetaTag("name", "twitter:image", ogUrl);
    }

    setMetaTag("property", "og:type", "website");

    // 4. Inject Facebook Pixel if ID or Code is provided
    if (data.facebook_pixel_id && !window.__cm_fb_injected) {
      try {
        /* eslint-disable */
        (function (f, b, e, v, n, t, s) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = "2.0";
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        window.fbq("init", data.facebook_pixel_id);
        window.fbq("track", "PageView");
        window.__cm_fb_injected = true;
      } catch (e) {
        console.warn("Failed to initialize Meta Pixel:", e);
      }
    }

    // Inject raw custom Facebook Pixel code if provided
    if (data.facebook_pixel_code && !document.getElementById("cm-custom-fb-code")) {
      const script = document.createElement("div");
      script.id = "cm-custom-fb-code";
      script.innerHTML = data.facebook_pixel_code;
      document.head.appendChild(script);
    }

    // 5. Inject Google Analytics 4 / Google Tag Manager if provided
    if (data.google_analytics_id && !window.__cm_ga_injected) {
      try {
        const gaId = data.google_analytics_id.trim();
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", gaId);
        window.__cm_ga_injected = true;
      } catch (e) {
        console.warn("Failed to initialize Google Analytics:", e);
      }
    }

    // Inject raw custom Google tracking code if provided
    if (data.google_analytics_code && !document.getElementById("cm-custom-ga-code")) {
      const script = document.createElement("div");
      script.id = "cm-custom-ga-code";
      script.innerHTML = data.google_analytics_code;
      document.head.appendChild(script);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        resolveAssetUrl,
        refreshSettings: fetchSettings,
        defaultLogo,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      settings: null,
      loading: false,
      resolveAssetUrl: (path, fallback) => path || fallback,
      refreshSettings: () => {},
      defaultLogo,
    };
  }
  return context;
}
