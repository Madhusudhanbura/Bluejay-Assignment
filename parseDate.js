// This function takes the dateObj and segregates the date and time of every entry
parseTime = (dateObj) => {

  dateObj = new Date(dateObj);
  const isoString = dateObj.toISOString();

  // Extract date and time from the ISO string
  const date = isoString.slice(0, 10);
  const time = isoString.slice(11, 16);
  return {date, time};
}



module.exports = parseTime ;