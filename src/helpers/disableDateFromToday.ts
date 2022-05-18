import moment from "moment";

export const disabledDateFromToday = (current: any) => {
  // Can not select days before today and today
  return current && current >= moment().endOf('day');
}
