const INPUT_SEARCH_CONSTANTS = {
  options: [
    {
      value: "success",
      label: "Bảng tin"
    },
    {
      value: "success_admin",
      label: "Bài viết của admin"
    },
    {
      value: "pending",
      label: "Bài viết đang chờ duyệt"
    },
    {
      value: "cancel",
      label: "Bài viết đã hủy"
    },
  ],
  optionsFindByUser: [
    {
      value: "success",
      label: "Bài viết đã duyệt"
    },
    {
      value: "pending",
      label: "Bài viết đang chờ duyệt"
    },
    {
      value: "cancel",
      label: "Bài viết đã hủy"
    },
  ],
  optionsSort: [
    {
      value: "ASC",
      label: "Cũ đến mới",
    },
    {
      value: "DESC",
      label: "Mới đến cũ",
    }
  ],
  label: {
    date: "Ngày đăng",
    author: "Tên người đăng",
    freeText: "Tiêu đề",
    typePost: "Loại bài viết",
  },
  submit: "Tìm kiếm"
};

export default INPUT_SEARCH_CONSTANTS;
