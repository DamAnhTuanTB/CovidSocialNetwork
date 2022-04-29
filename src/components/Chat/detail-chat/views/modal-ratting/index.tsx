// @ts-nocheck
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalRattingStyled } from './styled';
import { EyeOutlined, MehFilled, FrownFilled, SmileFilled } from '@ant-design/icons';
import { Button } from 'antd';
import StarRating from '../../../../Base/BaseRatingStar';

const ModalRatting = (props: any) => {
  const {
    isShowModalRate,
    setIsShowModalRate,
  } = props;

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmitRate = () => {    
    setIsShowModalRate(false);
  }
  return (
    <ModalRattingStyled
      rating={rating}
      title="Đánh giá cuộc trò chuyện"
      centered
      visible={isShowModalRate}
      onOk={handleSubmitRate}
      onCancel={() => setIsShowModalRate(false)}
      footer={[
        <Button key="back" onClick={() => setIsShowModalRate(false)}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmitRate}>
          Đánh giá
        </Button>,
      ]}
    >
      <div className="icon-emotion">
        {
          rating < 3 && (
            <FrownFilled />
          )
        }
        {
          rating === 3 && (
            <MehFilled />
          )
        }
        {
          rating > 3 && (
            <SmileFilled />
          )
        }
      </div>
      <StarRating rating={rating} setRating={setRating}/>

    </ModalRattingStyled>
  );
};

ModalRatting.propTypes = {

};

export default ModalRatting;