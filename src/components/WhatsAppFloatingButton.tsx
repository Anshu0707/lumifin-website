import { useTranslation } from "react-i18next";
import WhatsAppIcon from "./WhatsAppIcon";

// wa.me click-to-chat link for the Lumi business WhatsApp number (+33 1 62 29 01 61).
const WHATSAPP_URL = "https://wa.me/33162290161";

/**
 * Persistent floating WhatsApp button, always visible on every page.
 * Placed bottom-left so it never overlaps ScrollProgress (bottom-right).
 */
export default function WhatsAppFloatingButton() {
  const { t } = useTranslation();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("footer.whatsapp")}
      title={t("footer.whatsapp")}
      // Cookie banner is fixed bottom-4/left-4/right-4 on mobile (near
      // full-width) before moving to the right on md+, so this sits above
      // it on small screens and drops back down once there's no overlap.
      className="fixed bottom-24 left-4 md:bottom-6 md:left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 hover:scale-110 hover:shadow-2xl transition-all"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
