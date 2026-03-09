import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize TikTok Pixel
(function initTikTokPixel() {
  const w = window as any;
  const t = 'ttq';
  w.TiktokAnalyticsObject = t;
  const ttq = w[t] = w[t] || [];
  ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
  ttq.setAndDefer = function(obj: any, method: string) {
    obj[method] = function() { obj.push([method].concat(Array.prototype.slice.call(arguments, 0))); };
  };
  for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
  ttq.instance = function(id: string) {
    const e = ttq._i[id] || [];
    for (let n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
    return e;
  };
  ttq.load = function(pixelId: string, opts?: any) {
    const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[pixelId] = [];
    ttq._i[pixelId]._u = r;
    ttq._t = ttq._t || {};
    ttq._t[pixelId] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[pixelId] = opts || {};
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = r + "?sdkid=" + pixelId + "&lib=" + t;
    const first = document.getElementsByTagName("script")[0];
    first.parentNode?.insertBefore(script, first);
  };
  ttq.load('D6N5LUJC77UF08S741U0');
  ttq.page();
  console.log('TikTok Pixel initialized: D6N5LUJC77UF08S741U0');
})();

createRoot(document.getElementById("root")!).render(<App />);
