const symbolYear = [undefined, '2-digit', undefined, 'numeric'];
const symbolMonth = [undefined, '2-digit', 'short', 'long', 'narrow'];
const symbolDay = [undefined, '2-digit'];
const symbolHour = [undefined, '2-digit'];
const symbolMinute = [undefined, '2-digit'];
const symbolSecond = [undefined, '2-digit'];
const symbolWeekday = [undefined, 'short', 'short', 'long', 'narrow'];
const symbolTimezone = [undefined, 'short', 'short', 'long'];
const PATTERN_REGEX = /[MydDhHmsSGZPa]+/g;
const formatSinglePart = (context, date, dateTimeFormatOptions) => {
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
};
export const formatDate = (context, date, pattern) => {
    let result = '';
    let previousIndex = 0;
    for (const match of pattern.matchAll(PATTERN_REGEX)) {
        const matched = match[0];
        const matchedIndex = matched.length - 1;
        result += pattern.slice(previousIndex, match.index);
        previousIndex = match.index + matched.length;
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
};
//# sourceMappingURL=index.js.map