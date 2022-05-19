
const MODAL_CREATE_EXPERT_CONSTANTS = {
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
    submit: "Ok",
    edit: "Chỉnh sửa",
    cancel: "Hủy",
    regexPhone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
    validate: {
      required: "Vui lòng điền",
      email: "Email không đúng định dạng",
      phone: "Số điện thoại không đúng định dạng",
      minLength: "Mật khẩu tối thiểu 6 kí tự",
      verifyPass: "Mật khẩu không giống nhau",
    },
    placeholder: {
      email: "Email",
      firstName: "Tên",
      lastName: "Họ",
      nickName: "Biệt danh",
      birthday: "Ngày sinh",
      phone: "Số điện thoại",
      password: "Mật khẩu",
      repassword: "Nhập lại mật khẩu",
    },
    message: {
      error: {
        internalServer: "Lỗi hệ thống",
      }
    }
  },
  listTab: ["Thông tin cá nhân", "Đổi mật khẩu"],
  message: {
    success: "Tạo chuyên gia thành công",
    error: "Tạo chuyên gia không thành công",
    errorSystem: "Lỗi hệ thống",
    errorEmailExist: "Email đã tồn tại",
  }
};

export default MODAL_CREATE_EXPERT_CONSTANTS;
