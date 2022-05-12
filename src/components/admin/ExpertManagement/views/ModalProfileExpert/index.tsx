import React, { useEffect, useState } from 'react';
import MODAL_PROFILE_EXPERT_CONSTANTS from './constants';
import { ModalProfileExpertStyled } from './styled';
import ChangePasswordExpert from './views/change-password';
import FormProfile from './views/form-profile';

const ModalProfileExpert = (props: any) => {
  const {
    previewExpert = {},
    setPreviewExpert = () => { }
  } = props;

  const handleCancel = () => {
    setPreviewExpert(null);
    setIsEditProfile(false);
    setActiveTab(0);
  }
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
          />
        ) : (
          <ChangePasswordExpert previewExpert={previewExpert}/>
        )
      }
    </ModalProfileExpertStyled>
  );
};

export default ModalProfileExpert;