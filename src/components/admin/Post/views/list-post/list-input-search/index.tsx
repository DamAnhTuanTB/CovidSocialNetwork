import { Button, DatePicker, Form, Input, Select } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ConvertObjToParamsURL from '../../../../../../helpers/convertObjToUrl';
import INPUT_SEARCH_CONSTANTS from './constant';
import { ListInputSearchStyled } from './styled';

const ListInputSearch = (props: any) => {
  const {
    valueSearch = {},
    dateFormat,
    form,
    isSearchByUser = false,
  } = props;

  const history = useHistory();

  const onFinish = (values: any) => {
    if (values.date) {
      values.date = values.date.format(dateFormat);
    }
    history.push(`${ConvertObjToParamsURL(values)}`);
  }

  return (
    <ListInputSearchStyled>
      <Form>
        <Form
          className="search-form"
          form={form}
          layout="vertical"
          initialValues={valueSearch}
          onFinish={onFinish}
        >
          <Form.Item
            name="date"
            className="date"
            label={INPUT_SEARCH_CONSTANTS.label.date}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          {
            !isSearchByUser && (
              <Form.Item
                name="author"
                className="author"
                label={INPUT_SEARCH_CONSTANTS.label.author}
              >
                <Input />
              </Form.Item>
            )
          }
          <Form.Item
            name="freeText"
            className="free-text"
            label={INPUT_SEARCH_CONSTANTS.label.freeText}
          >
            <Input />
          </Form.Item>
          <Form.Item label={INPUT_SEARCH_CONSTANTS.label.typePost} name="type">
            <Select className="select-post">
              {
                isSearchByUser ? (
                  <>
                    {
                      INPUT_SEARCH_CONSTANTS.optionsFindByUser.map((item, index) => (
                        <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                      ))
                    }
                  </>
                ) : (
                  <>
                    {
                      INPUT_SEARCH_CONSTANTS.options.map((item, index) => (
                        <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                      ))
                    }
                  </>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label={INPUT_SEARCH_CONSTANTS.label.typePost} name="typeSort">
            <Select className="select-sort">
              {
                INPUT_SEARCH_CONSTANTS.optionsSort.map((item, index) => (
                  <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Button type="primary" className="search-form-button" onClick={form.submit}>
            {INPUT_SEARCH_CONSTANTS.submit}
          </Button>
        </Form>
      </Form>
    </ListInputSearchStyled>
  );
};

export default ListInputSearch;