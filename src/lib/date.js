import dayjs from 'dayjs';

export default function relative(iso) {
  // add YYYY if more than a year ago
  const sameElse = dayjs(iso).isBefore(dayjs().subtract(1, 'year'))
    ? 'MMM DD, YYYY'
    : 'MMM DD';

  return dayjs(iso).isBefore(dayjs().subtract(12, 'hours'))
    ? dayjs(iso).calendar(null, {
        sameDay: '[Today]',

        // shouldn't be possible but  ¯\_(ツ)_/¯
        nextDay: '[Tomorrow]',
        nextWeek: '[This coming] dddd',

        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse,
      })
    : dayjs().to(dayjs(iso));
}
