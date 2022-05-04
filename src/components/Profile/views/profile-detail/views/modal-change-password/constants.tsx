
const MODAL_CHANGE_PASSWORD_CONSTANTS = {
  title: "Đổi mật khẩu",
  submit: "Ok",
  cancel: "Hủy",
  label: {
    currentPass: "Mật khẩu hiện tại",
    newPass: "Mật khẩu mới",
    confirmPass: "Nhập lại mật khẩu mới",
  },
  validate: {
    required: "Vui lòng điền",
    passMinLength: "Mật khẩu tối thiểu 6 kí tự",
    verifyOldPass: "Mật khẩu mới phải khác mật khẩu cũ",
    verifyNewPass: "Mật khẩu không giống nhau"
  },
  message: {
    success: "Bạn đã đổi mật khẩu thành công",
    error: {
      internalServer: "Lỗi hệ thống",
    }
  }
};

export default MODAL_CHANGE_PASSWORD_CONSTANTS;
