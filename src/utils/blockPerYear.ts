export default () => {
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const daysPerYear = 365;
  const averageBlockTimeSeconds = 14;

  const blocksPerYear =
    (minutesPerHour * minutesPerHour * hoursPerDay * daysPerYear) /
    averageBlockTimeSeconds;
  return blocksPerYear;
};
