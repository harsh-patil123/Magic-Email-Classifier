import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  } catch {
    return dateString;
  }
};

export const formatTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, "h:mm a");
  } catch {
    return "";
  }
};

export const truncate = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};
