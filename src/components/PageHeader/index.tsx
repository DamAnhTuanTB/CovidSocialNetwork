import { BellOutlined, MailOutlined, HomeOutlined, HomeFilled } from '@ant-design/icons';
import { Button, Divider, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { handleConvertDateStringToDate } from '../../helpers/convertDateStringToDate';
import { useGetNotifilcation } from '../../hooks/useNotification';
import ModalProfileExpert from '../admin/ExpertManagement/views/ModalProfileExpert';
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
  const [previewExpert, setPreviewExpert] = useState<any>(null);
  const [totalNotify, setTotalNotify] = useState(10);
  const [listNotification, setListNotification] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const queryClient = useQueryClient();
  const myProfile: any = queryClient.getQueryData("my-profile");

  const { notification } = useGetNotifilcation(isShowNotification && !isExpert);

  // const showNotify = (data: any) => {
  //   console.log("pageheader", data);
  // }

  const handleSearchPost = (value: any) => {
    if (value) {
      history.push(`/search?freeText=${value}`);
    }
  }

  const handleClickProfile = () => {
    if (isExpert) {
      setPreviewExpert({
        avatar: "https://firebasestorage.googleapis.com/v0/b/fir-upload-image-a79ce.appspot.com/o/file%2Fapple.jpg?alt=media&token=e70705e0-d740-413d-90fd-aaeb0f23dace",
        create_at: "2022-04-29T08:15:36.000Z",
        date_of_birth: "2000-10-24",
        email: "tuancules24@gmail.com",
        first_name: "Tuấn",
        id: "5",
        is_active: null,
        last_name: "Lê 2",
        nick_name: "tuancules",
        role: "patient",
        telephone: "0912342223",
        update_at: "2022-04-29",
      });
      console.log(myProfile);

    } else {
      history.push("/profile");
    }
  }

  useEffect(() => {
    // socket?.on('notify', showNotify);
    // return () => {
    //   socket.off('notify', showNotify);
    // };
  }, [])

  useEffect(() => {
    if (isShowNotification) {
      setTotalNotify(0);
      queryClient.invalidateQueries("notifications");
    }
  }, [isShowNotification])

  useEffect(() => {
    setListNotification(notification?.data)
  }, [notification])

  return (

    <PageHeaderStyled totalNotify={totalNotify} isShowNotification={isShowNotification}>
      <ModalCreatePost
        isShowModalCreate={isShowModal}
        setIsShowModalCreate={setIsShowModal}
        profile={myProfile}
      />
      {
        isExpert && (
          <ModalProfileExpert
            isExpert
            previewExpert={previewExpert}
            setPreviewExpert={setPreviewExpert}
          />
        )
      }
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
          {
            !isExpert && (
              <>
                {
                  location.pathname.startsWith("/post") ? (
                    <HomeFilled className="icon-header home-active" onClick={() => {
                      history.push("/post");
                    }} />
                  ) : (
                    <HomeOutlined className="icon-header" onClick={() => {
                      history.push("/post");
                    }} />
                  )
                }

              </>
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
                <BellOutlined className="icon-header" onClick={() => { setIsShowNotification(!isShowNotification) }} />
                {
                  totalNotify > 0 && (
                    <div className="unread-notification">{totalNotify}</div>
                  )
                }
                {
                  isShowNotification && (
                    <div className="dropdown">
                      <div className="dropdown-before"></div>
                      <div className="dropdown-after"></div>
                      <Divider orientation="left" orientationMargin="0">
                        <div className="title-notification">
                          {PAGE_HEADER_CONSTANTS.notificationTitle}
                        </div>
                      </Divider>
                      {
                        listNotification?.length > 0 ? listNotification?.map((item: any) => (
                          <div
                            className="item-notification"
                            onClick={() => {
                              history.push(`/post/${item?.postId}`);
                              setIsShowNotification(false);
                            }}
                          >
                            <BaseImagePreview
                              isLoading
                              cancelPreview
                              className="avatar-sender-notification"
                              src={item?.sender_avatar || "/defaultAvatar.png"}
                              alt="" />
                            <div className="detail">
                              <div className="content">
                                <span>{item?.sender_nick_name}</span>
                                {item?.content_texts}
                                {" bài viết của bạn"}
                              </div>
                              <div className="created-at">
                                {handleConvertDateStringToDate(item?.create_at)}
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="no-notification">{PAGE_HEADER_CONSTANTS.noNotification}</div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            )
          }
          <div className="user-avatar" onClick={handleClickProfile}>
            <BaseImagePreview isLoading cancelPreview className="avatar" src={myProfile?.avatar || "/defaultAvatar.png"} alt="" />
          </div>
          {
            !isExpert && (
              <Button type="primary" className="button-create-post" onClick={() => setIsShowModal(true)}>
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
