import { format, formatDistanceToNow, isToday as isTodayFns, isYesterday as isYesterdayFns, differenceInDays } from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, formatStr);
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd, yyyy · h:mm a');
};

export const relativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
};

export const isToday = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return isTodayFns(d);
};

export const isYesterday = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return isYesterdayFns(d);
};

export const dateRange = (start: Date | string, end: Date | string): string => {
  return `${formatDate(start)} - ${formatDate(end)}`;
};

export const getWeekNumber = (date: Date | string): number => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
  const pastDaysOfYear = (d.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const groupByDate = <T extends { createdAt: Date | string }>(
  items: T[]
): Map<string, T[]> => {
  const groups = new Map<string, T[]>();
  
  items.forEach((item) => {
    const date = typeof item.createdAt === 'string' ? new Date(item.createdAt) : item.createdAt;
    let key: string;
    
    if (isToday(date)) {
      key = 'Today';
    } else if (isYesterday(date)) {
      key = 'Yesterday';
    } else if (differenceInDays(new Date(), date) <= 7) {
      key = 'This Week';
    } else {
      key = formatDate(date, 'MMMM yyyy');
    }
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(item);
  });
  
  return groups;
};