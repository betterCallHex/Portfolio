const longDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatLongDate(isoDate: string) {
  return longDate.format(new Date(isoDate));
}

export function yearOf(isoDate: string) {
  return new Date(isoDate).getFullYear();
}
