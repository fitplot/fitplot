import dayjs from 'dayjs';

export default function relative(iso) {
  return dayjs(iso).isBefore(dayjs().subtract(12, 'hours'))
    ? dayjs(iso).calendar(null, {
        sameElse: 'MMM DD, YYYY h:mm a',
      })
    : dayjs().to(dayjs(iso));
}
