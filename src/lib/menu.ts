export const IG_URL = "https://www.instagram.com/whetfmyplate?igsh=M2xmcDUwbndzeXBj&utm_source=qr";
export const IG_HANDLE = "Platesbycere";
export const OWNER_EMAIL = "Platesbycere@gmail.com";

export type MenuItem = {
  emoji: string;
  name: string;
  desc: string;
  price: string;
  unitPrice: number;
  unitLabel: string;
  options?: string[];
  designRequired?: boolean;
  fixedQuantities?: number[];
};

export const MENU: MenuItem[] = [
  { emoji: "🍔", name: "Sliders", desc: "Mini burgers, big flavor", price: "$2 each · 4 for $10 · +$2 each after", unitPrice: 2, unitLabel: "each" },
  { emoji: "🍤", name: "Boudin Balls", desc: "Crispy & savory bites", price: "$3 each · 3 for $12 · +$3 each after", unitPrice: 3, unitLabel: "each", options: ["With Hot Cheetos 🔥", "Without (regular)"] },
  { emoji: "🧀", name: "Mac n Cheese Balls", desc: "Regular or Hot Cheetos crusted 🔥", price: "$3 each · 3 for $12 · +$3 each after", unitPrice: 3, unitLabel: "each", options: ["With Hot Cheetos 🔥", "Regular"] },
  { emoji: "🍝", name: "Chicken Alfredo", desc: "With or without shrimp 🍤", price: "$10", unitPrice: 10, unitLabel: "plate", options: ["With Shrimp 🍤", "Without Shrimp"] },
  { emoji: "🍤", name: "Shrimp Pasta", desc: "Creamy & dreamy", price: "$10", unitPrice: 10, unitLabel: "plate" },
  { emoji: "🍰", name: "Cheesecake Cups", desc: "Lil cups of heaven", price: "$6", unitPrice: 6, unitLabel: "cup" },
  { emoji: "🍫", name: "Dubai Chocolate Cups", desc: "Pistachio + kataifi 😍 viral fave", price: "DM for price 💌", unitPrice: 0, unitLabel: "cup" },
  { emoji: "🍓", name: "Chocolate Covered Strawberries", desc: "Dipped with love", price: "$8 for 6 · $12 for a dozen", unitPrice: 8, unitLabel: "pieces", designRequired: true, fixedQuantities: [6, 12] },
  { emoji: "🍪", name: "Chocolate Covered Oreos", desc: "Custom designs available", price: "$8 for 6 · $12 for a dozen", unitPrice: 8, unitLabel: "pieces", designRequired: true, fixedQuantities: [6, 12] },
  { emoji: "🥨", name: "Chocolate Covered Pretzels", desc: "Sweet + salty perfection", price: "$8 for 6 · $12 for a dozen", unitPrice: 8, unitLabel: "pieces", designRequired: true, fixedQuantities: [6, 12] },
  { emoji: "🍪", name: "Cake Cookies", desc: "Soft, thick & dreamy", price: "$2 each · 4 for $5 · +$2 each after", unitPrice: 2, unitLabel: "each", designRequired: true },
  { emoji: "🎂", name: "Mini Cakes", desc: "Custom designs on request", price: "$8 each", unitPrice: 8, unitLabel: "each", designRequired: true },
  { emoji: "🍭", name: "More Dipped Treats", desc: "Just ask — I got you!", price: "$8 for 6 · $12 for a dozen", unitPrice: 8, unitLabel: "pieces", designRequired: true, fixedQuantities: [6, 12] },
];

export const MENU_BY_NAME: Record<string, MenuItem> = Object.fromEntries(MENU.map((m) => [m.name, m]));

export function priceFor(item: MenuItem, qty: number): number {
  if (qty <= 0) return 0;
  switch (item.name) {
    case "Sliders":
      if (qty < 4) return qty * 2;
      return 10 + (qty - 4) * 2;
    case "Boudin Balls":
    case "Mac n Cheese Balls":
      if (qty < 3) return qty * 3;
      return 12 + (qty - 3) * 3;
    case "Cake Cookies":
      if (qty < 4) return qty * 2;
      return 5 + (qty - 4) * 2;
    case "Chocolate Covered Strawberries":
    case "Chocolate Covered Oreos":
    case "Chocolate Covered Pretzels":
    case "More Dipped Treats":
      return qty >= 12 ? 12 : 8;
    default:
      return item.unitPrice * qty;
  }
}

export type OrderItem = {
  name: string;
  emoji: string;
  qty: number;
  variant?: string;
  design?: string;
  unitPrice: number;
  unitLabel: string;
  lineTotal: number;
};

export type OrderInfo = {
  name: string;
  email: string;
  contact: string;
  pickup: string;
  details: string;
  items: OrderItem[];
  subtotal: number;
  depositCredit: number;
  remaining: number;
};
