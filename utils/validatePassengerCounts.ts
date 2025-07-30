export const validatePassengerCounts = (
  adults: number,
  children: number,
  infants: number
) => adults >= 1 && adults + children + infants <= 9 && adults >= infants;