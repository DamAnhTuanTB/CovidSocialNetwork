import { DeleteOutlined, EyeOutlined, FileImageOutlined } from '@ant-design/icons';
import { Pagination, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import dataRecordGuest from './fakeDataGuest';
import { ListGuestStyled } from './styled';
import ModalListImage from './views/modalListImage';
import ModalProfileGuest from './views/modalProfileGuest';

const TITLE = "Danh sách bệnh nhân";

const ListGuestComponent = (props: any) => {

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState("1");
  const params = new URL(window.location.href);
  const paramsUrl = params.searchParams;

  const [previewGuest, setPreviewGuest] = useState(null);
  const [idGuest, setIdGuest] = useState(null);

  const columns = [
    {
      title: 'Thời gian tạo',
      dataIndex: 'create_at',
      key: 'create_at',
      width: 100,
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
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: 'Ngày sinh',
      key: 'birthday',
      dataIndex: 'birthday',
      width: 100,
    },
    {
      title: '',
      key: 'action',
      width: 70,
      render: (data: any) => (
        <Space>
          <FileImageOutlined className="image-icon" onClick={() => setIdGuest(data.id)}/>
          <EyeOutlined className="seemore-icon" onClick={() => setPreviewGuest(data)} />
          <DeleteOutlined className="delete-icon" onClick={() => {}} />
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
    <ListGuestStyled>
      <div className="title">
        {TITLE}
      </div>
      <Table
        columns={columns}
        dataSource={dataRecordGuest}
        pagination={false}
      />
      <div className="pagination">
        <Pagination
          current={+currentPage}
          total={50}
          onChange={handleChangePage}
        />
      </div>
      <ModalProfileGuest
        previewGuest={previewGuest}
        setPreviewGuest={setPreviewGuest}
      />
      <ModalListImage
        idGuest={idGuest}
        setIdGuest={setIdGuest}
      />
    </ListGuestStyled>
  );
};

export default ListGuestComponent;