import Dayjs from "dayjs";

export function isValidUrl(url) {
  if (url === null) {
    return false;
  } else {
    // regular expression for URL validation
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    // test the given URL against the regular expression
    return regex.test(url);
  }
}

export function dateFormatArticle(val) {
  return utcTime(val);
}

export function dateFormat(val) {
  const date = new Date(val);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return formattedDate;
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function formatServerDate(data) {
  return Dayjs(data).format("DD/MM/YYYY");
}

export function formatServerDateTime(data) {
  return Dayjs(data).format("DD/MM/YYYY hh:mm");
}

export function utcTime(utcDateTimeString) {
  const date = new Date(utcDateTimeString);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  });
  return `${formattedDate} ${formattedTime}`;
}

export function formatTimeStampDate(timestamp) {
  if (timestamp === null || timestamp === undefined) return "";
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

export function formatTimeToFeedbackDateFormat(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();

  const difference = today - date;

  if (difference.days > 0) {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    const ago = `${difference.days} days ago`;

    return `${formattedDate} ${formattedTime} ${ago}`;
  } else {
    return "Today";
  }
}

export function formatCurrency(price) {
  if (price === null || price === undefined) return "";
  return price.toLocaleString("en-US", { style: "currency", currency: "INR" });
}

export function formatTimeToUnix(dateLocal) {
  const date = new Date(dateLocal);
  const unixTimestamp = date.getTime();
  return unixTimestamp;
}

export function formatServerDateTimeStamp(data) {
  return new Date(data).getTime();
}
