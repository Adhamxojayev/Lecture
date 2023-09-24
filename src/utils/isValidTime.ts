export const isTimeSlotValid = (
  start_time: string,
  end_time: string,
): boolean => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  if (!timeRegex.test(start_time) || !timeRegex.test(end_time)) {
    return false;
  }

  const startTime = new Date(`1970-01-01T${start_time}:00`);
  const endTime = new Date(`1970-01-01T${end_time}:00`);

  if (startTime >= endTime) {
    return false;
  }

  return true;
};
