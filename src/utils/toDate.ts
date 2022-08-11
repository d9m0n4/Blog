const locale = navigator.language;

export const toDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: options?.hour ? options.hour : undefined,
    minute: options?.minute ? options.minute : undefined,
  };
  const userDate = new Intl.DateTimeFormat(locale, dateOptions);
  const currentDate = new Date(date);
  return userDate.format(currentDate);
};
