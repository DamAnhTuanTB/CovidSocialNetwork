import React, { useEffect, useState } from 'react';
import { MailOutlined, BellOutlined } from '@ant-design/icons';
import { PageHeaderStyled } from './styled';
import { Button, Input } from 'antd';
import ModalCreatePost from '../Post/views/modal-create-post';
import { useHistory } from 'react-router-dom';

export default function PageHeader(props: any) {
  const {
    isExpert = false
  } = props;
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const history = useHistory();

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
      />
      <div className="header-container">
        <div className="logo">
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
                        Thông báo
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
            <img src="/post/avatar_my1.jpg" alt="" />
          </div>
          {
            !isExpert && (
              <Button type="primary" onClick={() => setIsShowModal(true)}>
                Viết bài
              </Button>
            )
          }
        </div>
      </div>
    </PageHeaderStyled>
  );
}
