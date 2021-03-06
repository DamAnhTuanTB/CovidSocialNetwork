/* eslint-disable react-hooks/exhaustive-deps */

import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LIST_MENU_SIDEBAR from './constant';
import { SideBarAdminStyled } from './styled';

const SideBarAdmin = (props: any) => {
  const params = new URL(window.location.href);

  const [keyParent, setKeyParent] = useState("");
  const [keyChild, setKeyChild] = useState("");
  
  useEffect(() => {
    const pathname = params.pathname;
    const currentActiveMenu = {
      keyParent: "",
      key: "",
    }
    LIST_MENU_SIDEBAR.forEach((item) => {
      if (pathname.startsWith(item?.link) && !item.isSubMenu) {
        currentActiveMenu.key = item.key;
        return;
      } else {
        item.subMenu?.forEach((itemSubmenu) => {
          if (pathname.startsWith(itemSubmenu?.link)) {
            currentActiveMenu.key = itemSubmenu.key;
            currentActiveMenu.keyParent = item.key;
            return;
          }
        })
      }
    })
    setKeyChild(currentActiveMenu.key);
    setKeyParent(currentActiveMenu.keyParent);
  }, [params.href])

  return (
    <SideBarAdminStyled>
      <Menu
        defaultSelectedKeys={[keyChild]}
        defaultOpenKeys={[keyParent]}
        selectedKeys={[keyChild]}
        mode="inline"
        theme='dark'
      >
        {
          LIST_MENU_SIDEBAR.map((itemMenu, index) => {
            if (!itemMenu.isSubMenu) {
              return (
                <Menu.Item key={itemMenu.key}>
                  <span>{itemMenu.label}</span>
                  <Link to={itemMenu.link} />
                </Menu.Item>
              )
            } else {
              return (
                <Menu.SubMenu key={itemMenu.key} title={itemMenu.label}>
                  {
                    itemMenu.subMenu?.map((itemSubMenu) => (
                      <Menu.Item key={itemSubMenu.key}>
                        <span>{itemSubMenu.label}</span>
                        <Link to={itemSubMenu.link} />
                      </Menu.Item>
                    ))
                  }
                </Menu.SubMenu>
              )
            }
          })
        }
      </Menu>
    </SideBarAdminStyled>
  );
};

export default SideBarAdmin;