import moment from "moment";

const handleConvertDateStringToDateTime = (dateString: any) => {
  if (!dateString) {
    return;
  }
  const dateObj = new Date(dateString);
  const momentObj = moment(dateObj);
  return momentObj.format("DD/MM/YYYY - HH:mm");
};

export const handleConvertDateStringToDate = (dateString: any) => {
  if (!dateString) {
    return;
  }
  const dateObj = new Date(dateString);
  const momentObj = moment(dateObj);
  return momentObj.format("DD-MM-YYYY");
};

export default handleConvertDateStringToDateTime;
// export { handleConvertDateStringToDate }
