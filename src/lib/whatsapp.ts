const fallbackPhone = "34600000000";

export function normalizePhone(phone?: string) {
  const digits = phone?.replace(/[^\d]/g, "") ?? "";
  return digits || fallbackPhone;
}

export function buildWhatsappHref(phone: string | undefined, message: string) {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;
}
