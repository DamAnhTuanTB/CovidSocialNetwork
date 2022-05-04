/* eslint-disable react/prop-types */
import { FireTwoTone, FlagTwoTone, StarTwoTone } from '@ant-design/icons';
import React from 'react';
import FILTER_POST_CONSTANTS from './constants';
import { FilterStyle } from './styled';

const Filter = (props: any) => {
  const { activeTab, handleClickTab } = props;
  return (
    <FilterStyle className="filter-sort">
      <div className="title">
        {FILTER_POST_CONSTANTS.title}
      </div>
      <div className="list-filter">
        <div
          aria-hidden
          onClick={(e) => { handleClickTab("new"); }}
          className={`item-filter ${activeTab === "new" && "active"}`}
        >
          <StarTwoTone twoToneColor={activeTab !== "new" ? "#a3a3a3" : "#3199d5"} /><span>new</span>
        </div>
        <div
          aria-hidden
          onClick={(e) => { handleClickTab("hot"); }}
          className={`item-filter ${activeTab === "hot" && "active"}`}
        >
          <FireTwoTone twoToneColor={activeTab !== "hot" ? "#a3a3a3" : "#3199d5"} /><span>hot</span>
        </div>
        <div
          aria-hidden
          onClick={(e) => { handleClickTab("top"); }}
          className={`item-filter ${activeTab === "top" && "active"}`}
        >
          <FlagTwoTone twoToneColor={activeTab !== "top" ? "#a3a3a3" : "#3199d5"} /><span>top</span>
        </div>
      </div>
    </FilterStyle>
  );
};

export default Filter;
