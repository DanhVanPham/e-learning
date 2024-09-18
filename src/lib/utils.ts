import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatViewToK(views: number) {
  if(views < 1000) return views;
  return `${(views/ 1000).toFixed(1)}k`
}

export function parseMinutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60); // Chia lấy phần nguyên của giờ
  const remainingMinutes = minutes % 60;  // Phút còn lại sau khi chia
  return `${hours}h${remainingMinutes}ph`;
}
