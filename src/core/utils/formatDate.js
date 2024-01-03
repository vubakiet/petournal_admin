function convertDateFormat(inputDate) {
  const originalDate = new Date(inputDate);
  // Ensure that the date is valid
  if (isNaN(originalDate.getTime())) {
    return "Invalid Date";
  }

  const day = String(originalDate.getDate()).padStart(2, "0");
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const year = originalDate.getFullYear();

  return `${day}/${month}/${year}`;
}

export default convertDateFormat;
