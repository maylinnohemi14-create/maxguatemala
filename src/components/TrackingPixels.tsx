import { useEffect } from "react";
import { useTrackingPixels, initFacebookPixel, initTikTokPixel } from "@/hooks/useTrackingPixels";

export const TrackingPixels = () => {
  const pixels = useTrackingPixels();

  useEffect(() => {
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
