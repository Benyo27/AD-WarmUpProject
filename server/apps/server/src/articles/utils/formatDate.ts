import { parseISO, format, differenceInDays } from 'date-fns';
import { UTCDate } from '@date-fns/utc';

export function formatDate(created_at: string) {
  const parsedDate = parseISO(created_at);
  const now = new Date();
  const daysDifference = differenceInDays(now, parsedDate);
  if (daysDifference < 1) {
    return format(new UTCDate(created_at), 'hh:mm aaa');
  } else if (daysDifference === 1) {
    return 'Yesterday';
  } else {
    return format(created_at, 'MMM d');
  }
}
