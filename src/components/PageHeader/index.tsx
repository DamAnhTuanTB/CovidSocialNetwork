import { BellOutlined, HomeFilled, HomeOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Divider, Input } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { updateActiveExpert } from '../../api/expert/profile';
import { updateActive } from '../../api/profile';
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

  const { pathname } = useLocation();

  let isChatPage = pathname === '/chat';

  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [previewExpert, setPreviewExpert] = useState<any>(null);
  const [totalNotify, setTotalNotify] = useState(0);
  const [listNotification, setListNotification] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const queryClient = useQueryClient();
  const myProfile: any = queryClient.getQueryData("my-profile");
  const profileExpert: any = queryClient.getQueryData("profile-expert");

  const { notification } = useGetNotifilcation(isShowNotification && !isExpert);
  const mutation = useMutation(isExpert ? updateActiveExpert : updateActive);

  const showNotify = (data: any) => {
    if (data?.userIdTo === myProfile?.id && data?.userIdTo !== data?.userIdFrom) {
      setTotalNotify((total) => total + 1)
    }
  }

  const handleSearchPost = (value: any) => {
    if (value) {
      history.push(`/search?freeText=${value}`);
    }
  }

  const handleClickProfile = () => {
    if (isExpert) {
      setPreviewExpert(profileExpert);
    } else {
      history.push("/profile");
    }
  }

  const handleClickLogout = () => {
    mutation.mutate(0, {
      onSuccess: (data) => {
        if (isExpert) {
          Cookies.remove('tokenExpert');
          history.push('/expert/login');
        } else {
          history.push("/logout");
        }
      }, 
      onError: (err) => {
        console.log(err);
      }
    })
  }

  useEffect(() => {
    if (!isExpert) {
      const socket = io('http://localhost:4444');
      socket?.on('notify_post', showNotify);
      return () => {
        socket.off('notify_post', showNotify);
      };
    }
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
            !isExpert && !isChatPage && (
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
          {/* <MailOutlined className="icon-header" onClick={() => {
            if (isExpert) {
              history.push("/expert/chat")
            } else {
              history.push("/chat");
            }
          }} /> */}
          {
            !isChatPage && <MailOutlined className="icon-header" onClick={() => {
              if (isExpert) {
                history.push("/expert/chat")
              } else {
                history.push("/chat");
              }
            }} />
          }
          {
            !isExpert && !isChatPage && (
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
            <BaseImagePreview isLoading cancelPreview className="avatar" src={!isExpert ? (myProfile?.avatar || "/defaultAvatar.png") : (profileExpert?.avatar || "/defaultAvatar.png")} alt="" />
          </div>
          {
            !isExpert && (
              <Button type="primary" className="button-create-post" onClick={() => setIsShowModal(true)}>
                {PAGE_HEADER_CONSTANTS.createPost}
              </Button>
            )
          }
          {
            !isChatPage && <div className="icon-header icon-logout">
              <img src='/logout-user.svg' className="" alt='' onClick={handleClickLogout} />
            </div>
          }
        </div>
      </div>
    </PageHeaderStyled>
  );
}
