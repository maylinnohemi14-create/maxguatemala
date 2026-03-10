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

interface TrackingPixel {
  id: string;
  platform: 'facebook' | 'tiktok';
  pixel_id: string;
  is_active: boolean;
}

// ===== IMMEDIATELY initialize ttq stub so events queue before pixel loads =====
(function initTtqStub() {
  if (typeof window === 'undefined') return;
  if (window.ttq) return; // already exists
  
  const w = window as any;
  const t = 'ttq';
  w.TiktokAnalyticsObject = t;
  const ttq: any = w[t] = w[t] || [];
  ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
  ttq.setAndDefer = function(obj: any, method: string) {
    obj[method] = function() {
      obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  for (let i = 0; i < ttq.methods.length; i++) {
    ttq.setAndDefer(ttq, ttq.methods[i]);
  }
  ttq.instance = function(id: string) {
    const e = ttq._i[id] || [];
    for (let n = 0; n < ttq.methods.length; n++) {
      ttq.setAndDefer(e, ttq.methods[n]);
    }
    return e;
  };
  ttq.load = function(e: string, n?: any) {
    const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[e] = [];
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
  console.log('TikTok ttq stub initialized (events will queue)');
})();

// ===== IMMEDIATELY initialize fbq stub so events queue before pixel loads =====
(function initFbqStub() {
  if (typeof window === 'undefined') return;
  if (window.fbq) return;
  
  const n: any = window.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  
  // Load the FB script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const first = document.getElementsByTagName('script')[0];
  first.parentNode?.insertBefore(script, first);
  console.log('Facebook fbq stub initialized (events will queue)');
})();

export const useTrackingPixels = () => {
  const [pixels, setPixels] = useState<TrackingPixel[]>([]);

  useEffect(() => {
    fetchPixels();
  }, []);

  const fetchPixels = async () => {
    try {
      const { data, error } = await supabase
        .from('tracking_pixels')
        .select('*')
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching tracking pixels:', error);
        return;
      }
      
      if (data && data.length > 0) {
        console.log('Tracking pixels loaded from DB:', data.length);
        setPixels(data as TrackingPixel[]);
      } else {
        console.warn('No active tracking pixels found in database');
      }
    } catch (err) {
      console.error('Exception fetching tracking pixels:', err);
    }
  };

  return pixels;
};

// Track initialized pixels to prevent duplicates
const initializedPixels = new Set<string>();

// Simple SHA-256 hash using Web Crypto API
const sha256Hash = async (value: string): Promise<string> => {
  if (!value) return '';
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(value.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return '';
  }
};

// Initialize Facebook Pixel (just init + PageView, stub already loaded)
export const initFacebookPixel = (pixelId: string) => {
  if (typeof window === 'undefined' || !window.fbq) return;
  if (initializedPixels.has(`fb_${pixelId}`)) return;
  
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
  initializedPixels.add(`fb_${pixelId}`);
  console.log('Facebook Pixel initialized:', pixelId);
};

// Initialize TikTok Pixel (just load + page, stub already loaded)
export const initTikTokPixel = (pixelId: string) => {
  if (typeof window === 'undefined' || !window.ttq) return;
  if (initializedPixels.has(`tt_${pixelId}`)) return;
  
  window.ttq.load(pixelId);
  window.ttq.page();
  initializedPixels.add(`tt_${pixelId}`);
  console.log('TikTok Pixel initialized:', pixelId);
};

// Identify user for TikTok with hashed PII
export const identifyTikTokUser = async (data: { email?: string; phone?: string; externalId?: string }) => {
  if (typeof window === 'undefined' || !window.ttq) return;
  
  const identifyData: Record<string, string> = {};
  
  if (data.email) {
    identifyData.email = await sha256Hash(data.email);
  }
  if (data.phone) {
    identifyData.phone_number = await sha256Hash(data.phone);
  }
  if (data.externalId) {
    identifyData.external_id = await sha256Hash(data.externalId);
  }
  
  if (Object.keys(identifyData).length > 0) {
    window.ttq.identify(identifyData);
    console.log('TikTok identify:', identifyData);
  }
};

// Track Facebook conversion
export const trackFacebookConversion = (eventName: string, data?: any) => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('Facebook Event:', eventName, data);
      window.fbq('track', eventName, data);
    } else {
      console.warn('Facebook fbq not available for event:', eventName);
    }
  } catch (err) {
    console.error('Error tracking Facebook event:', eventName, err);
  }
};

// Track TikTok conversion - ensures content_id is at root level AND inside contents array
export const trackTikTokConversion = (eventName: string, data?: any) => {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      // TikTok requires content_id at root level for VSA compatibility
      const enrichedData = { ...data };
      if (data?.contents?.[0]?.content_id && !enrichedData.content_id) {
        enrichedData.content_id = data.contents[0].content_id;
      }
      if (data?.contents?.[0]?.content_name && !enrichedData.content_name) {
        enrichedData.content_name = data.contents[0].content_name;
      }
      if (data?.contents?.[0]?.content_type && !enrichedData.content_type) {
        enrichedData.content_type = data.contents[0].content_type;
      }
      console.log('TikTok Event:', eventName, enrichedData);
      window.ttq.track(eventName, enrichedData);
    } else {
      console.warn('TikTok ttq not available for event:', eventName);
    }
  } catch (err) {
    console.error('Error tracking TikTok event:', eventName, err);
  }
};

// Helper to get TikTok cookie values
const getCookie = (name: string): string => {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : '';
};

// Helper to get ttclid from URL params
const getTtclid = (): string => {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get('ttclid') || getCookie('ttclid') || '';
};

// Generate a unique event_id
const generateEventId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

// Enhanced TikTok Purchase event with ALL required parameters
export const trackTikTokPurchase = async (params: {
  productId: string;
  productName: string;
  value: number;
  currency: string;
  email?: string;
  phone?: string;
  externalId?: string;
  ip?: string;
}) => {
  if (typeof window === 'undefined' || !window.ttq) return;

  const eventId = generateEventId();
  const eventTime = Math.floor(Date.now() / 1000);

  // Identify user with hashed PII before the event
  const identifyData: Record<string, string> = {};
  if (params.email) identifyData.email = await sha256Hash(params.email);
  if (params.phone) identifyData.phone_number = await sha256Hash(params.phone);
  if (params.externalId) identifyData.external_id = await sha256Hash(params.externalId);
  
  // Add client info parameters
  const ttclid = getTtclid();
  const ttp = getCookie('_ttp');
  
  if (ttclid) identifyData.ttclid = ttclid;
  if (ttp) identifyData.ttp = ttp;

  if (Object.keys(identifyData).length > 0) {
    window.ttq.identify(identifyData);
    console.log('TikTok identify (Purchase):', identifyData);
  }

  // Track Purchase with full parameters - content_id at root level for VSA
  const eventData: Record<string, any> = {
    content_id: params.productId,
    content_type: 'product',
    content_name: params.productName,
    contents: [{
      content_id: params.productId,
      content_type: 'product',
      content_name: params.productName,
    }],
    value: params.value,
    currency: params.currency,
    event_id: eventId,
  };

  // Fire BOTH CompletePayment (TikTok standard) and Purchase (alternative)
  try {
    window.ttq.track('CompletePayment', eventData);
    console.log('TikTok CompletePayment (enhanced):', eventData);
  } catch (e) { console.error('TikTok CompletePayment enhanced failed:', e); }

  try {
    window.ttq.track('Purchase', eventData);
    console.log('TikTok Purchase (enhanced):', eventData);
  } catch (e) { console.error('TikTok Purchase enhanced failed:', e); }

  console.log('TikTok enhanced purchase metadata:', {
    event_id: eventId,
    event_time: eventTime,
    url: window.location.href,
    user_agent: navigator.userAgent,
    ip: params.ip || 'collected server-side',
    ttclid: ttclid || 'n/a',
    ttp: ttp || 'n/a',
  });
};
