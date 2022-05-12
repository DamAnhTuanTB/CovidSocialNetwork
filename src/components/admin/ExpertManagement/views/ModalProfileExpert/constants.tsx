
const MODAL_PROFILE_EXPERT_CONSTANTS = {
  label: {
    firstName: "Tên",
    lastName: "Họ",
    nickName: "Biệt danh",
    birthday: "Ngày sinh",
    email: "Email",
    phone: "Số điện thoại",
  },
  modalEditConstant: {
    title: "Chỉnh sửa thông tin cá nhân",
    submit: "Xác nhận",
    edit: "Chỉnh sửa",
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
  },
  listTab: ["Thông tin cá nhân", "Đổi mật khẩu"]
};

export default MODAL_PROFILE_EXPERT_CONSTANTS;
