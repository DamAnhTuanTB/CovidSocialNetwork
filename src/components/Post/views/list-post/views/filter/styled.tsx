import styled from "styled-components";

const FilterStyle = styled.div`
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d0d0d0;
    .title {
        font-size: 16px;
        padding: 2px 0;
        padding-left: 15px;
        border-left: 5px solid #f1847d;
    }
    .list-filter {
        display: flex;
        align-items: center;
        font-size: 12px;
        .item-filter {
            cursor: pointer;
            padding: 7px 15px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            .anticon {
                svg {
                    width: 12px;
                    height: auto;
                    margin-right: 5px;
                }
            }
        }
        .active {
            color: #f1847d;
            border-bottom: 3px solid #f1847d;
        }
    }
`;

export { FilterStyle };
