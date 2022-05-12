import { DeleteOutlined, EyeOutlined, MessageOutlined } from '@ant-design/icons';
import { Button, Pagination, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ModalCreateExpert from '../ModalCreateExpert';
import ModalProfileExpert from '../ModalProfileExpert';
import dataRecordExpert from './fakeDataExpert';
import { ListExpertStyled } from './styled';

const TITLE = "Danh sách chuyên gia";

const ListExpertComponent = (props: any) => {

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState("1");
  const params = new URL(window.location.href);
  const paramsUrl = params.searchParams;

  const [isShowModalCreate, setIsShowModalCreate] = useState(false);

  const [previewExpert, setPreviewExpert] = useState(null);
  const [idExpert, setIdExpert] = useState(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 10,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: 'Biệt danh',
      dataIndex: 'nick_name',
      key: 'nick_name',
      width: 120,
    },
    {
      title: 'Họ và tên',
      key: 'full_name',
      width: 100,
      render: (data: any) => {
        return (
          <>
            {data?.first_name + " " + data?.last_name}
          </>
        )
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'telephone',
      key: 'telephone',
      width: 120,
    },
    {
      title: 'Ngày sinh',
      key: 'date_of_birth',
      dataIndex: 'date_of_birth',
      width: 100,
    },
    {
      title: 'Đánh giá',
      key: 'rate',
      width: 80,
      render: (data: any) => (
        <>{`${data.rate} / 5`}</>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 70,
      render: (data: any) => (
        <Space>
          <MessageOutlined className="image-icon" onClick={() => history.push(`/admin/expert-management/list-chat/1`)} />
          <EyeOutlined className="seemore-icon" onClick={() => setPreviewExpert(data)} />
          <DeleteOutlined className="delete-icon" onClick={() => { }} />
        </Space>
      ),
    },
  ];

  const handleChangePage = (page: any) => {
    history.push(`?page=${page}`);
  }

  useEffect(() => {
    setCurrentPage(paramsUrl.get("page") || "1");
  }, [params.href])



  return (
    <ListExpertStyled>
      <div className="title-container">
        <div className="title">
          {TITLE}
        </div>
        <div className="list-button">
          <Button type="primary" onClick={() => setIsShowModalCreate(true)}>Tạo chuyên gia</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataRecordExpert}
        pagination={false}
      />
      <div className="pagination">
        <Pagination
          current={+currentPage}
          total={50}
          onChange={handleChangePage}
        />
      </div>
      <ModalProfileExpert
        previewExpert={previewExpert}
        setPreviewExpert={setPreviewExpert}
      />
      <ModalCreateExpert
        isShowModalCreate={isShowModalCreate}
        setIsShowModalCreate={setIsShowModalCreate}
      />
    </ListExpertStyled>
  );
};

export default ListExpertComponent;