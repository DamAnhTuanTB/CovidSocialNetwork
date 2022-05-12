const INPUT_SEARCH_CONSTANTS = {
  options: [
    {
      value: "success",
      label: "Bảng tin"
    },
    {
      value: "my-post",
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
      value: "asc",
      label: "Cũ đến mới",
    },
    {
      value: "desc",
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
