import { BUSINESS } from "@/lib/site-config";

/**
 * Fixed floating "chat on WhatsApp" button, shown on every page. Uses the
 * shared business phone number (lib/site-config.ts) so it always stays in
 * sync with the footer/contact page. Kept in WhatsApp's own brand green —
 * intentionally outside the site's orange/charcoal palette so it reads
 * instantly as the familiar WhatsApp affordance.
 */
export function WhatsAppButton() {
  const digits = BUSINESS.telephone.replace(/[^\d]/g, "");

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="size-7" fill="currentColor" aria-hidden="true">
        <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.353.615 4.657 1.784 6.687L2.667 29.333l6.79-1.78a13.27 13.27 0 0 0 6.547 1.78h.006c7.362 0 13.332-5.97 13.332-13.333 0-3.562-1.387-6.911-3.906-9.43a13.246 13.246 0 0 0-9.432-3.903Zm0 24.4h-.005a11.08 11.08 0 0 1-5.65-1.547l-.405-.24-4.03 1.057 1.076-3.93-.264-.404a11.06 11.06 0 0 1-1.694-5.903c0-6.115 4.977-11.09 11.096-11.09a11.02 11.02 0 0 1 7.844 3.25 11.02 11.02 0 0 1 3.248 7.847c0 6.115-4.978 11.09-11.096 11.09h-.12Zm6.086-8.307c-.334-.167-1.974-.974-2.28-1.086-.306-.112-.53-.167-.752.167-.223.334-.865 1.086-1.06 1.31-.196.223-.39.25-.724.083-.334-.167-1.41-.52-2.685-1.657-.993-.885-1.663-1.98-1.858-2.313-.196-.334-.02-.514.147-.68.15-.15.334-.39.5-.585.167-.196.223-.334.334-.557.111-.223.056-.418-.028-.585-.083-.167-.752-1.812-1.03-2.482-.271-.652-.546-.564-.752-.575l-.64-.011c-.223 0-.585.083-.891.418-.306.334-1.168 1.14-1.168 2.782s1.196 3.227 1.363 3.45c.167.223 2.354 3.594 5.703 5.04.797.344 1.418.55 1.902.703.799.254 1.526.218 2.101.132.641-.096 1.974-.807 2.252-1.586.278-.78.278-1.448.195-1.587-.083-.14-.306-.223-.64-.39Z" />
      </svg>
    </a>
  );
}
