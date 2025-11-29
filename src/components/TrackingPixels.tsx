import { useEffect } from "react";
import { useTrackingPixels, initFacebookPixel, initTikTokPixel } from "@/hooks/useTrackingPixels";

// Hardcoded TikTok Pixel - Remove when user requests
const HARDCODED_TIKTOK_PIXEL_ID = 'D4LK3U3C77U1VUV8SRF0';

export const TrackingPixels = () => {
  const pixels = useTrackingPixels();

  useEffect(() => {
    // Initialize hardcoded TikTok pixel
    initTikTokPixel(HARDCODED_TIKTOK_PIXEL_ID);
    
    // Initialize pixels from database
    pixels.forEach(pixel => {
      if (pixel.platform === 'facebook') {
        initFacebookPixel(pixel.pixel_id);
      } else if (pixel.platform === 'tiktok') {
        initTikTokPixel(pixel.pixel_id);
      }
    });
  }, [pixels]);

  return null;
};
