export const convertTime = (time: string) => {
  if (time) {
    return String(new Date(time))
      .replace("GMT+0700 (Indochina Time)", "")
      .replace("GMT+0700 (Giờ Đông Dương)", "");
  }
};
