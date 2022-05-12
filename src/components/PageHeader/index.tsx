import { BellOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import BaseImagePreview from '../Base/BaseImagePreview';
import ModalCreatePost from '../Post/views/modal-create-post';
import PAGE_HEADER_CONSTANTS from './constants';
import { PageHeaderStyled } from './styled';

export default function PageHeader(props: any) {
  const {
    isExpert = false
  } = props;
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const history = useHistory();

  const queryClient = useQueryClient();
  const myProfile: any = queryClient.getQueryData("my-profile");

  const showNotify = (data: any) => {
    console.log("pageheader", data);
  }

  const handleSearchPost = (value: any) => {
    if (value) {
      history.push(`/search?freeText=${value}`);
    }
  }

  useEffect(() => {
    // socket?.on('notify', showNotify);
    // return () => {
    //   socket.off('notify', showNotify);
    // };
  }, [])

  return (

    <PageHeaderStyled>
      <ModalCreatePost
        isShowModalCreate={isShowModal}
        setIsShowModalCreate={setIsShowModal}
        profile={myProfile}
      />
      <div className="header-container">
        <div className="logo" onClick={() => history.push('/post')}>
          <img src="/login/facebookLogo.svg" alt="" />
        </div>
        <div className="list-button">
          {
            !isExpert && (
              <Input.Search className="input-search" onSearch={handleSearchPost} placeholder="Tìm kiếm" />
            )
          }
          <MailOutlined className="icon-header" onClick={() => {
            if (isExpert) {
              history.push("/expert/chat")
            } else {
              history.push("/chat");
            }
          }} />
          {
            !isExpert && (
              <div className="notification">
                <BellOutlined className="icon-header" onClick={() => setIsShowNotification(!isShowNotification)} />
                {
                  isShowNotification && (
                    <div className="dropdown">
                      <div className="title-notification">
                        {PAGE_HEADER_CONSTANTS.notificationTitle}
                      </div>
                      <div className="item-notification">
                        <img src="/post/avatar_my1.jpg" alt="" />
                        <div className="detail">
                          <div className="content">
                            <span>Admin</span>
                            vừa phê duyệt yêu cầu của bạn
                          </div>
                          <div className="created-at">
                            20 tháng 4
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            )
          }
          <div className="user-avatar" onClick={() => history.push("/profile")}>
            <BaseImagePreview isLoading cancelPreview className="avatar" src={myProfile?.avatar || "/defaultAvatar.png"} alt="" />
          </div>
          {
            !isExpert && (
              <Button type="primary" onClick={() => setIsShowModal(true)}>
                {PAGE_HEADER_CONSTANTS.createPost}
              </Button>
            )
          }
          <div className="icon-header icon-logout">
            <img src='/logout-user.svg' className="" alt='' onClick={() => history.push("/logout")} />
          </div>
        </div>
      </div>
    </PageHeaderStyled>
  );
}
