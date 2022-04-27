const ConvertObjToParamsURL = (obj: any) => {
  let paramUrl = "?";
  let count = 0;
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      if (count === 0) {
        paramUrl += `${key}=${encodeURIComponent(obj[key])}`;
      } else {
        paramUrl += `&${key}=${encodeURIComponent(obj[key])}`;
      }
      count++;
    }
  });
  return paramUrl;
};
export default ConvertObjToParamsURL;
