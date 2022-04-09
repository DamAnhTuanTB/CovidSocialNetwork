/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FireTwoTone, FlagTwoTone, StarTwoTone } from '@ant-design/icons';
import { FilterStyle } from './styled';

const Filter = (props: any) => {
  const { activeTab, handleClickTab } = props;
  return (
    <FilterStyle className="filter-sort">
      <div className="title">
        DÀNH CHO BẠN
      </div>
      <div className="list-filter">
        <div
          aria-hidden
          onClick={(e) => { handleClickTab("new"); }}
          className={`item-filter ${activeTab === 1 && "active"}`}
        >
          <StarTwoTone twoToneColor={activeTab !== 1 ? "#a3a3a3" : "#3199d5"} /><span>new</span>
        </div>
        <div
          aria-hidden
          onClick={(e) => { handleClickTab("hot"); }}
          className={`item-filter ${activeTab === 2 && "active"}`}
        >
          <FireTwoTone twoToneColor={activeTab !== 2 ? "#a3a3a3" : "#3199d5"} /><span>hot</span>
        </div>
        <div
          aria-hidden
          onClick={(e) => { handleClickTab("top"); }}
          className={`item-filter ${activeTab === 3 && "active"}`}
        >
          <FlagTwoTone twoToneColor={activeTab !== 3 ? "#a3a3a3" : "#3199d5"} /><span>top</span>
        </div>
      </div>
    </FilterStyle>
  );
};

export default Filter;
