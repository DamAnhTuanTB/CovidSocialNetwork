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
        label: "Danh sách bệnh nhân",
        key: "guest-management",
        link: "/admin/guest-management",
      },
      {
        label: "Danh sách chuyên gia",
        key: "expert-management",
        link: "/admin/expert-management",
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
