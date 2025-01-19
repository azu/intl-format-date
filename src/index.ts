/**
 * y: undefined,
 * yy: '2-digit',
 * yyy: undefined,
 * yyyy: 'numeric',
 */
const symbolYear: Intl.DateTimeFormatOptions["year"][] = [undefined, '2-digit', undefined, 'numeric'];
/**
 * M: undefined,
 * MM: '2-digit',
 * MMM: 'short',
 * MMMM: 'long',
 * MMMMM: 'narrow',
 */
const symbolMonth: Intl.DateTimeFormatOptions["month"][] = [undefined, '2-digit', 'short', 'long', 'narrow'];
/**
 * d: undefined,
 * dd: '2-digit',
 */
const symbolDay: Intl.DateTimeFormatOptions["day"][] = [undefined, '2-digit'];
/**
 * H: undefined,
 * HH: '2-digit',
 */
const symbolHour: Intl.DateTimeFormatOptions["hour"][] = [undefined, '2-digit'];
/**
 * m: undefined,
 * mm: '2-digit',
 */
const symbolMinute: Intl.DateTimeFormatOptions["minute"][] = [undefined, '2-digit'];
/**
 * s: undefined,
 * ss: '2-digit',
 */
const symbolSecond: Intl.DateTimeFormatOptions["second"][] = [undefined, '2-digit'];
/**
 * E: undefined,
 * EE: 'short',
 * EEE: 'short',
 * EEEE: 'long',
 * EEEEE: 'narrow',
 */
const symbolWeekday: Intl.DateTimeFormatOptions["weekday"][] = [undefined, 'short', 'short', 'long', 'narrow'];
/**
 * z: undefined,
 * zz: 'short',
 * zzz: 'short',
 * zzzz: 'long',
 */
const symbolTimezone: Intl.DateTimeFormatOptions["timeZoneName"][] = [undefined, 'short', 'short', 'long'];

export type FormatContext = {
  /**
   * The time zone to format the date.
   */
  timeZone: string;
  /**
   * The locale to format the date.
   */
  locale: string;
}

// symbol patterns
const PATTERN_REGEX = /[MydDhHmsSGZPa]+/g;
const formatSinglePart = (context: FormatContext, date: Date, dateTimeFormatOptions: Intl.DateTimeFormatOptions): string => {
  const parts = new Intl.DateTimeFormat(context.locale, {
    ...dateTimeFormatOptions,
    timeZone: context.timeZone,
  }).formatToParts(date);
  return parts.map(part => {
    switch (part.type) {
      case 'year':
        return part.value;
      case 'month':
        return part.value;
      case 'day':
        return part.value;
      case 'hour':
        return part.value;
      case 'minute':
        return part.value;
      case 'second':
        return part.value;
      case 'dayPeriod':
        return part.value;
      case 'timeZoneName':
        return part.value;
      default:
        return '';
    }
  }).join('');
}
export const formatDate = (context: FormatContext, date: Date, pattern: string): string => {
  let result = '';
  let previousIndex = 0;
  for (const match of pattern.matchAll(PATTERN_REGEX)) {
    const matched = match[0];
    const matchedIndex = matched.length - 1;
    // append the string before the match
    result += pattern.slice(previousIndex, match.index);
    // update the previous index
    previousIndex = match.index + matched.length;
    // append the matched part
    switch (matched.at(0)) {
      case 'y':
        result += formatSinglePart(context, date, { year: symbolYear[matchedIndex] });
        break;
      case 'M':
        result += formatSinglePart(context, date, { month: symbolMonth[matchedIndex] });
        break;
      case 'd':
        result += formatSinglePart(context, date, { day: symbolDay[matchedIndex] });
        break;
      case 'H':
        result += formatSinglePart(context, date, { hour: symbolHour[matchedIndex], hour12: false });
        break;
      case 'm':
        result += formatSinglePart(context, date, { minute: symbolMinute[matchedIndex] });
        break;
      case 's':
        result += formatSinglePart(context, date, { second: symbolSecond[matchedIndex] });
        break;
      case 'E':
        result += formatSinglePart(context, date, { weekday: symbolWeekday[matchedIndex] });
        break;
      case 'z':
        result += formatSinglePart(context, date, { timeZoneName: symbolTimezone[matchedIndex] });
        break;
      default:
        result += matched;
        break;
    }
  }
  return result;
}
