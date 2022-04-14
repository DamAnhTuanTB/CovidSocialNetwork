import React, { useState } from 'react';
import { MailOutlined, BellOutlined } from '@ant-design/icons';
import { PageHeaderStyled } from './styled';
import { Button } from 'antd';
import ModalCreatePost from '../Post/views/modal-create-post';
export default function PageHeader() {
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
  console.log(123123, scrollbarWidth);
  
  return (
    <PageHeaderStyled>
      <ModalCreatePost
        isShowModalCreate={isShowModal}
        setIsShowModalCreate={setIsShowModal}
      />
      <div className="header-container">
        <div className="logo">
          <img src="/login/facebookLogo.svg" alt="" />
        </div>
        <div className="list-button">
          <MailOutlined className="icon-header" />
          <div className="notification">
            <BellOutlined className="icon-header" onClick={() => setIsShowNotification(!isShowNotification)} />
            {
              isShowNotification && (
                <div className="dropdown">
                  112312312312
                </div>
              )
            }
          </div>
          <div className="user-avatar">
            <img src="/post/avatar_my1.jpg" alt="" />
          </div>
          <Button type="primary" onClick={() => setIsShowModal(true)}>
            Viết bài
          </Button>,
        </div>
      </div>
    </PageHeaderStyled>
  );
}
