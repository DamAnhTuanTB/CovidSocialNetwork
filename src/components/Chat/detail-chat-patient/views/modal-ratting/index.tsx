// @ts-nocheck
import { FrownFilled, MehFilled, SmileFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import StarRating from '../../../../Base/BaseRatingStar';
import MODAL_RATING_CONSTANTS from './constants';
import { ModalRattingStyled } from './styled';

const ModalRatting = (props: any) => {
  const {
    isShowModalRate,
    setIsShowModalRate,
    handleSetEvaluate
  } = props;

  const [rating, setRating] = useState(5);

  const handleSubmitRate = () => {
    handleSetEvaluate(rating);
    setIsShowModalRate(false);
  }

  return (
    <ModalRattingStyled
      rating={rating}
      title={MODAL_RATING_CONSTANTS.title}
      centered
      visible={isShowModalRate}
      onOk={handleSubmitRate}
      onCancel={() => setIsShowModalRate(false)}
      footer={[
        <Button key="back" onClick={() => setIsShowModalRate(false)}>
          {MODAL_RATING_CONSTANTS.cancel}
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmitRate}>
          {MODAL_RATING_CONSTANTS.submit}
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
      <StarRating rating={rating} setRating={setRating} />

    </ModalRattingStyled>
  );
};

ModalRatting.propTypes = {

};

export default ModalRatting;