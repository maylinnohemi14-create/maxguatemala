import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useTrackingPixels,
  initFacebookPixel,
  initTikTokPixel,
  setActiveRoutePixels,
  trackFacebookPageView,
  trackTikTokPageView,
} from "@/hooks/useTrackingPixels";

export const TrackingPixels = () => {
  const pixels = useTrackingPixels();
  const location = useLocation();

  useEffect(() => {
    const matchingPixels = pixels.filter((pixel) => {
      const isGlobal = !pixel.page_route;
      const matchesRoute = pixel.page_route === location.pathname;
      return isGlobal || matchesRoute;
    });

    setActiveRoutePixels(matchingPixels);

    matchingPixels.forEach((pixel) => {
      if (pixel.platform === "facebook") {
        initFacebookPixel(pixel.pixel_id);
        trackFacebookPageView(pixel.pixel_id);
      } else if (pixel.platform === "tiktok") {
        initTikTokPixel(pixel.pixel_id);
        trackTikTokPageView(pixel.pixel_id);
      }
    });
  }, [pixels, location.pathname]);

  return null;
};
