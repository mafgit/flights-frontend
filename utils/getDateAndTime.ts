export function getDateAndTime(iso: string, timezoneOfDisplay?: string) {
  let date = new Date(iso);

  let date2 = date.toLocaleString("en-US", {
    timeZone:
      timezoneOfDisplay ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    day: "numeric",
    month: "short",
    // year: 'numeric',
    hour: "numeric",
    minute: "2-digit",
  });

  const [month, day, time, am] = date2.replace(/,/g, "").split(" ");
  return [day + " " + month, time + " " + am];
}
