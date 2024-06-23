import dayjs from "dayjs";

export const formatSearchStr = (obj) => {
  if (
    Object.prototype.toString.call(obj) === "[object Object]" &&
    Object.keys(obj).length
  ) {
    let arr = [];
    Object.keys(obj).forEach((item) => {
      arr.push(`${item}=${obj[item]}`);
    });

    return arr.join("&");
  }
  return "";
};
// 最小日期
export const MIN_DATE = dayjs().format("YYYY-MM-DD");
// 最大日期
export const MAX_DATE = dayjs().add(60, "day").format("YYYY-MM-DD");

// 获取两个日期之间的所有日期
export function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = dayjs(startDate);

  while (
    currentDate.isBefore(dayjs(endDate)) ||
    currentDate.isSame(dayjs(endDate), "day")
  ) {
    dates.push(currentDate.format("MM-DD"));
    currentDate = currentDate.add(1, "day");
  }

  return dates;
}
