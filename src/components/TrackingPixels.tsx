import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTrackingPixels, initFacebookPixel, initTikTokPixel } from "@/hooks/useTrackingPixels";

export const TrackingPixels = () => {
  const pixels = useTrackingPixels();
  const location = useLocation();

  useEffect(() => {
    // Initialize pixels filtered by current route
    // page_route = null means global (all pages), otherwise match current path
    pixels.forEach(pixel => {
      const isGlobal = !pixel.page_route;
      const matchesRoute = pixel.page_route === location.pathname;
      
      if (isGlobal || matchesRoute) {
        if (pixel.platform === 'facebook') {
          initFacebookPixel(pixel.pixel_id);
        } else if (pixel.platform === 'tiktok') {
          initTikTokPixel(pixel.pixel_id);
        }
      }
    });
  }, [pixels, location.pathname]);

  return null;
};
