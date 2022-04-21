const LIST_MENU_SIDEBAR = [
  {
    label: "Quản lý bài viết",
    key: "post-management",
    isSubMenu: false,
    link: "/admin/post-management",
  },
  {
    label: "Quản lý người dùng",
    key: "user-management",
    isSubMenu: true,
    link: "",
    subMenu: [
      {
        label: "Danh sách khách hàng",
        key: "list-guest",
        link: "/admin/list-guest",
      },
      {
        label: "Danh sách bác sĩ",
        key: "list-doctor",
        link: "/admin/list-doctor",
      }
    ]
  },
  {
    label: "Đổi mật khẩu",
    key: "change-password",
    isSubMenu: false,
    link: '/admin/change-password'
  }
];

export default LIST_MENU_SIDEBAR;
