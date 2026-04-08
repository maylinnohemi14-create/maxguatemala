import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    ttq?: any;
    TiktokAnalyticsObject?: string;
  }
}

export interface TrackingPixel {
  id: string;
  platform: "facebook" | "tiktok";
  pixel_id: string;
  is_active: boolean;
  page_route: string | null;
}

const activeRouteFacebookPixelIds = new Set<string>();
const activeRouteTikTokPixelIds = new Set<string>();

export const setActiveRoutePixels = (pixels: TrackingPixel[]) => {
  activeRouteFacebookPixelIds.clear();
  activeRouteTikTokPixelIds.clear();

  pixels.forEach((pixel) => {
    if (!pixel.is_active) return;

    if (pixel.platform === "facebook") {
      activeRouteFacebookPixelIds.add(pixel.pixel_id);
    } else if (pixel.platform === "tiktok") {
      activeRouteTikTokPixelIds.add(pixel.pixel_id);
    }
  });
};

const getTargetFacebookPixelIds = (pixelId?: string) =>
  pixelId ? [pixelId] : Array.from(activeRouteFacebookPixelIds);

const getTargetTikTokPixelIds = (pixelId?: string) =>
  pixelId ? [pixelId] : Array.from(activeRouteTikTokPixelIds);

(function initTtqStub() {
  if (typeof window === "undefined") return;
  if (window.ttq) return;

  const w = window as any;
  const t = "ttq";
  w.TiktokAnalyticsObject = t;
  const ttq: any = (w[t] = w[t] || []);
  ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
  ttq.setAndDefer = function (obj: any, method: string) {
    obj[method] = function () {
      obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  for (let i = 0; i < ttq.methods.length; i++) {
    ttq.setAndDefer(ttq, ttq.methods[i]);
  }
  ttq.instance = function (id: string) {
    ttq._i = ttq._i || {};
    const e = ttq._i[id] || [];
    for (let n = 0; n < ttq.methods.length; n++) {
      ttq.setAndDefer(e, ttq.methods[n]);
    }
    return e;
  };
  ttq.load = function (e: string, n?: any) {
    const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[e] = ttq._i[e] || [];
    ttq._i[e]._u = r;
    ttq._t = ttq._t || {};
    ttq._t[e] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[e] = n || {};
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = r + "?sdkid=" + e + "&lib=" + t;
    const first = document.getElementsByTagName("script")[0];
    first.parentNode?.insertBefore(script, first);
  };
  console.log("TikTok ttq stub initialized (events will queue)");
})();

(function initFbqStub() {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  const n: any = (window.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first.parentNode?.insertBefore(script, first);
  console.log("Facebook fbq stub initialized (events will queue)");
})();

export const useTrackingPixels = () => {
  const [pixels, setPixels] = useState<TrackingPixel[]>([]);

  useEffect(() => {
    fetchPixels();
  }, []);

  const fetchPixels = async () => {
    try {
      const { data, error } = await supabase
        .from("tracking_pixels")
        .select("*")
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching tracking pixels:", error);
        return;
      }

      if (data && data.length > 0) {
        console.log("Tracking pixels loaded from DB:", data.length);
        setPixels(data as TrackingPixel[]);
      } else {
        console.warn("No active tracking pixels found in database");
      }
    } catch (err) {
      console.error("Exception fetching tracking pixels:", err);
    }
  };

  return pixels;
};

export const usePagePixels = (route: string) => {
  const pixels = useTrackingPixels();

  const tiktokPixelIds = pixels
    .filter((p) => p.platform === "tiktok" && p.page_route === route)
    .map((p) => p.pixel_id);

  const facebookPixelIds = pixels
    .filter((p) => p.platform === "facebook" && p.page_route === route)
    .map((p) => p.pixel_id);

  return { tiktokPixelIds, facebookPixelIds, pixels };
};

const initializedPixels = new Set<string>();
const sentTikTokPurchaseEvents = new Set<string>();

const sha256Hash = async (value: string): Promise<string> => {
  if (!value) return "";
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(value.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return "";
  }
};

export const initFacebookPixel = (pixelId: string) => {
  if (typeof window === "undefined" || !window.fbq) return;
  if (initializedPixels.has(`fb_${pixelId}`)) return;

  window.fbq("init", pixelId);
  initializedPixels.add(`fb_${pixelId}`);
  console.log("Facebook Pixel initialized:", pixelId);
};

export const trackFacebookPageView = (pixelId: string) => {
  try {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("trackSingle", pixelId, "PageView");
    console.log("Facebook PageView (scoped):", pixelId);
  } catch (err) {
    console.error("Error tracking Facebook PageView:", pixelId, err);
  }
};

export const initTikTokPixel = (pixelId: string) => {
  if (typeof window === "undefined" || !window.ttq) return;
  if (initializedPixels.has(`tt_${pixelId}`)) return;

  window.ttq.load(pixelId);
  initializedPixels.add(`tt_${pixelId}`);
  console.log("TikTok Pixel initialized:", pixelId);
};

export const trackTikTokPageView = (pixelId: string) => {
  try {
    if (typeof window === "undefined" || !window.ttq) return;
    if (typeof window.ttq.instance !== "function") {
      console.warn("TikTok instance unavailable for page view:", pixelId);
      return;
    }

    window.ttq.instance(pixelId).page();
    console.log("TikTok PageView (scoped):", pixelId);
  } catch (err) {
    console.error("Error tracking TikTok PageView:", pixelId, err);
  }
};

export const identifyTikTokUser = async (data: { email?: string; phone?: string; externalId?: string }) => {
  if (typeof window === "undefined" || !window.ttq) return;

  const identifyData: Record<string, string> = {};

  if (data.email) identifyData.email = await sha256Hash(data.email);
  if (data.phone) identifyData.phone_number = await sha256Hash(data.phone);
  if (data.externalId) identifyData.external_id = await sha256Hash(data.externalId);

  if (Object.keys(identifyData).length === 0) return;

  const targetPixelIds = getTargetTikTokPixelIds();
  if (targetPixelIds.length === 0 || typeof window.ttq.instance !== "function") {
    console.warn("No active TikTok pixel available for identify");
    return;
  }

  targetPixelIds.forEach((targetPixelId) => {
    window.ttq.instance(targetPixelId).identify(identifyData);
    console.log("TikTok identify (scoped):", targetPixelId, identifyData);
  });
};

export const trackFacebookConversion = (eventName: string, data?: any, pixelId?: string) => {
  try {
    if (typeof window !== "undefined" && window.fbq) {
      const targetPixelIds = getTargetFacebookPixelIds(pixelId);

      if (targetPixelIds.length === 0) {
        console.warn("No active Facebook pixel available for event:", eventName);
        return;
      }

      targetPixelIds.forEach((targetPixelId) => {
        console.log("Facebook Event (scoped):", eventName, targetPixelId, data);
        window.fbq("trackSingle", targetPixelId, eventName, data);
      });
    } else {
      console.warn("Facebook fbq not available for event:", eventName);
    }
  } catch (err) {
    console.error("Error tracking Facebook event:", eventName, err);
  }
};

export const trackTikTokConversion = (eventName: string, data?: any, pixelId?: string) => {
  try {
    if (typeof window !== "undefined" && window.ttq) {
      const targetPixelIds = getTargetTikTokPixelIds(pixelId);

      if (targetPixelIds.length === 0 || typeof window.ttq.instance !== "function") {
        console.warn("No active TikTok pixel available for event:", eventName);
        return;
      }

      const enrichedData = { ...data };

      if (enrichedData.contents && Array.isArray(enrichedData.contents)) {
        enrichedData.contents = enrichedData.contents.map((item: any) => ({
          ...item,
          quantity: item.quantity || 1,
          price: item.price || enrichedData.value || 0,
        }));
      }

      if (enrichedData.contents?.[0]) {
        const first = enrichedData.contents[0];
        if (!enrichedData.content_id) enrichedData.content_id = first.content_id;
        if (!enrichedData.content_name) enrichedData.content_name = first.content_name;
        if (!enrichedData.content_type) enrichedData.content_type = first.content_type;
      }

      if (!enrichedData.quantity) enrichedData.quantity = 1;

      targetPixelIds.forEach((targetPixelId) => {
        console.log("TikTok Event (scoped):", eventName, targetPixelId, enrichedData);
        window.ttq.instance(targetPixelId).track(eventName, enrichedData);
      });
    } else {
      console.warn("TikTok ttq not available for event:", eventName);
    }
  } catch (err) {
    console.error("Error tracking TikTok event:", eventName, err);
  }
};

const getCookie = (name: string): string => {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : "";
};

const getTtclid = (): string => {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("ttclid") || getCookie("ttclid") || "";
};

const generateEventId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

const getTikTokPurchaseDedupKey = (pixelId: string | undefined, eventId: string) => `${pixelId || "global"}:${eventId}`;

export const trackTikTokPurchase = async (params: {
  productId: string;
  productName: string;
  value: number;
  currency: string;
  email?: string;
  phone?: string;
  externalId?: string;
  ip?: string;
  pixelId?: string;
  eventId?: string;
}) => {
  if (typeof window === "undefined" || !window.ttq) return;

  const targetPixelIds = getTargetTikTokPixelIds(params.pixelId);
  if (targetPixelIds.length === 0 || typeof window.ttq.instance !== "function") {
    console.warn("No active TikTok pixel available for purchase event:", params.productId);
    return;
  }

  const eventId = params.eventId || generateEventId();
  const eventTime = Math.floor(Date.now() / 1000);

  const identifyData: Record<string, string> = {};
  if (params.email) identifyData.email = await sha256Hash(params.email);
  if (params.phone) identifyData.phone_number = await sha256Hash(params.phone);
  if (params.externalId) identifyData.external_id = await sha256Hash(params.externalId);

  const ttclid = getTtclid();
  const ttp = getCookie("_ttp");

  if (ttclid) identifyData.ttclid = ttclid;
  if (ttp) identifyData.ttp = ttp;

  if (Object.keys(identifyData).length > 0) {
    targetPixelIds.forEach((targetPixelId) => {
      window.ttq.instance(targetPixelId).identify(identifyData);
      console.log("TikTok identify (Purchase scoped):", targetPixelId, identifyData);
    });
  }

  const eventData: Record<string, any> = {
    content_id: params.productId,
    content_type: "product",
    content_name: params.productName,
    contents: [
      {
        content_id: params.productId,
        content_type: "product",
        content_name: params.productName,
        quantity: 1,
        price: params.value,
      },
    ],
    value: params.value,
    currency: params.currency,
    quantity: 1,
    event_id: eventId,
  };

  targetPixelIds.forEach((targetPixelId) => {
    const dedupKey = getTikTokPurchaseDedupKey(targetPixelId, eventId);

    if (sentTikTokPurchaseEvents.has(dedupKey)) {
      console.warn("TikTok CompletePayment skipped (duplicate event_id):", dedupKey);
      return;
    }

    try {
      window.ttq.instance(targetPixelId).track("CompletePayment", eventData);
      sentTikTokPurchaseEvents.add(dedupKey);
      console.log("TikTok CompletePayment (scoped to", targetPixelId, "):", eventData);
    } catch (e) {
      console.error("TikTok CompletePayment failed:", e);
    }
  });

  console.log("TikTok enhanced purchase metadata:", {
    event_id: eventId,
    event_time: eventTime,
    pixel_ids: targetPixelIds,
    url: window.location.href,
    user_agent: navigator.userAgent,
    ip: params.ip || "collected server-side",
    ttclid: ttclid || "n/a",
    ttp: ttp || "n/a",
  });
};
