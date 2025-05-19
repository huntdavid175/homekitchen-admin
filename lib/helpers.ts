import { format, isValid } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (!isValid(date)) {
    return "Invalid date";
  }
  return format(date, "MMMM d, yyyy");
};
