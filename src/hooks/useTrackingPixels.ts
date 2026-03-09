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

export const useTrackingPixels = () => {
  const [pixels, setPixels] = useState<TrackingPixel[]>([]);

  useEffect(() => {
    fetchPixels();
  }, []);

  const fetchPixels = async () => {
    const { data } = await supabase
      .from('tracking_pixels')
      .select('*')
      .eq('is_active', true);
    
    if (data) {
      setPixels(data as TrackingPixel[]);
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

// Initialize Facebook Pixel
export const initFacebookPixel = (pixelId: string) => {
  if (typeof window === 'undefined') return;
  if (initializedPixels.has(`fb_${pixelId}`)) return;
  
  // @ts-ignore
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  if (window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    initializedPixels.add(`fb_${pixelId}`);
  }
};

// Initialize TikTok Pixel
export const initTikTokPixel = (pixelId: string) => {
  if (typeof window === 'undefined') return;
  if (initializedPixels.has(`tt_${pixelId}`)) return;
  
  // @ts-ignore
  !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  }(window, document, 'ttq');
  
  if (window.ttq) {
    window.ttq.load(pixelId);
    window.ttq.page();
    initializedPixels.add(`tt_${pixelId}`);
    console.log('TikTok Pixel initialized:', pixelId);
  }
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
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, data);
  }
};

// Track TikTok conversion with proper contents format
export const trackTikTokConversion = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).ttq) {
    console.log('TikTok Event:', eventName, data);
    (window as any).ttq.track(eventName, data);
  }
};
