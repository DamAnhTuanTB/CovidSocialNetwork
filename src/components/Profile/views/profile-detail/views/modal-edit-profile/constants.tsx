
const MODAL_EDIT_PROFILE_CONSTANTS = {
  title: "Chỉnh sửa thông tin cá nhân",
  submit: "Ok",
  cancel: "Hủy",
  regexPhone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  validate: {
    required: "Vui lòng điền",
    email: "Email không đúng định dạng",
    phone: "Số điện thoại không đúng định dạng",
  },
  placeholder: {
    email: "Email",
    firstName: "Tên",
    lastName: "Họ",
    nickName: "Biệt danh",
    birthday: "Ngày sinh",
    phone: "Số điện thoại",
  },
  message: {
    error: {
      internalServer: "Lỗi hệ thống",
    }
  }
};

export default MODAL_EDIT_PROFILE_CONSTANTS;
