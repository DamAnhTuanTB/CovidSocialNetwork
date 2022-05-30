import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import MODAL_PROFILE_EXPERT_CONSTANTS from './constants';
import { ModalProfileExpertStyled } from './styled';
import ChangePasswordExpert from './views/change-password';
import FormProfile from './views/form-profile';

const ModalProfileExpert = (props: any) => {
  const {
    previewExpert = {},
    setPreviewExpert = () => { },
    isExpert = false,
  } = props;

  const handleCancel = (isSubmitEdit: any) => {
    if (isSubmitEdit !== true) {
      formProfile.resetFields();
    }
    setPreviewExpert(null);
    setIsEditProfile(false);
    setActiveTab(0);
  }
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [formProfile] = Form.useForm();

  useEffect(() => {
    setIsEditProfile(false);
  }, [activeTab])

  return (
    <ModalProfileExpertStyled
      title={MODAL_PROFILE_EXPERT_CONSTANTS.listTab.find((item, index) => index === activeTab)}
      centered
      visible={!!previewExpert}
      onCancel={handleCancel}
      footer={null}
      width={600}
      isEditProfile={isEditProfile}
    >
      <div className="list-tab">
        {MODAL_PROFILE_EXPERT_CONSTANTS.listTab.map((item, index) => (
          <div className={`item-tab ${activeTab === index && "active"}`} key={item} onClick={() => setActiveTab(index)}>
            {item}
          </div>
        ))}
      </div>
      {
        activeTab === 0 ? (
          <FormProfile
            previewExpert={previewExpert}
            isEditProfile={isEditProfile}
            setIsEditProfile={setIsEditProfile}
            isExpert={isExpert}
            form={formProfile}
            handleCancel={handleCancel}
          />
        ) : (
          <ChangePasswordExpert handleCancel={handleCancel} previewExpert={previewExpert} isExpert={isExpert}/>
        )
      }
    </ModalProfileExpertStyled>
  );
};

export default ModalProfileExpert;