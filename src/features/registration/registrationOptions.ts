import type { TicketType } from "./model/registrationSchema";

export const TICKETS = [
  {
    value: "competitor",
    badge: "Battle pass",
    title: "Vé người đấu",
    description: "Tham gia thi đấu và vào cửa sự kiện",
    price: "159.000đ",
  },
  {
    value: "audience",
    badge: "Spectator pass",
    title: "Vé người xem",
    description: "Vào cửa và theo dõi toàn bộ giải đấu",
    price: "59.000đ",
  },
] as const satisfies ReadonlyArray<{
  value: TicketType;
  badge: string;
  title: string;
  description: string;
  price: string;
}>;

export const CITIES = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Huế",
  "Khác",
] as const;

export const COMPETITION_CATEGORIES = [
  { value: "solo", title: "Solo", description: "01 thí sinh" },
  { value: "duo", title: "Duo", description: "02 thí sinh" },
  { value: "team", title: "Team", description: "03–08 thí sinh" },
] as const;

export const DANCE_STYLES = [
  "Hip-hop",
  "Choreography",
  "Breaking",
  "Waacking",
  "Popping",
  "Open Style",
] as const;

export const EXPERIENCE_LEVELS = [
  { value: "first-time", label: "Lần đầu tham gia" },
  { value: "under-1-year", label: "Dưới 1 năm" },
  { value: "1-3-years", label: "1–3 năm" },
  { value: "over-3-years", label: "Trên 3 năm" },
] as const;

export function getTicketPrice(ticketType: TicketType) {
  return TICKETS.find((ticket) => ticket.value === ticketType)?.price ?? "";
}
