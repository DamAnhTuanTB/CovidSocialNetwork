import { DeleteOutlined, EyeOutlined, FileImageOutlined } from '@ant-design/icons';
import { Pagination, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { handleConvertDateStringToDate } from '../../../helpers/convertDateStringToDate';
import { useGetListGuest } from '../../../hooks/admin/useGuestAdmin';
import { ListGuestStyled } from './styled';
import ModalDeleteGuest from './views/modal-delete-guest';
import ModalListImage from './views/modalListImage';
import ModalProfileGuest from './views/modalProfileGuest';

const TITLE = "Danh sách bệnh nhân";

const ListGuestComponent = (props: any) => {

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState("1");
  const params = new URL(window.location.href);
  const paramsUrl = params.searchParams;
  const limitPerPage = 7;

  const [previewGuest, setPreviewGuest] = useState(null);
  const [idGuest, setIdGuest] = useState(null);
  const [listGuest, setListGuest] = useState([]);
  const [totalGuest, setTotalGuest] = useState(0);
  const [guestDelete, setGuestDelete] = useState();

  const { dataGuest, isLoadingGuest } = useGetListGuest({
    limit: limitPerPage,
    page: currentPage,
  })

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
      // dataIndex: 'telephone',
      key: 'telephone',
      width: 120,
      render: (data: any) => {
        return (
          <>
            {data?.telephone ? data?.telephone : "Không có"}
          </>
        )
      },
    },
    {
      title: 'Ngày sinh',
      key: 'date_of_birth',
      width: 100,
      render: (data: any) => {
        return (
          <>
            {handleConvertDateStringToDate(data?.date_of_birth)}
          </>
        )
      },
    },
    {
      title: '',
      key: 'action',
      width: 70,
      render: (data: any) => (
        <Space>
          <FileImageOutlined className="image-icon" onClick={() => setIdGuest(data.id)} />
          <EyeOutlined className="seemore-icon" onClick={() => setPreviewGuest(data)} />
          <DeleteOutlined className="delete-icon" onClick={() => setGuestDelete(data)} />
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

  useEffect(() => {
    if (dataGuest?.statusCode === 200) {
      setListGuest(dataGuest?.data);
      setTotalGuest(dataGuest?.total);
    }
  }, [dataGuest])

  return (
    <ListGuestStyled>
      <div className="title">
        {TITLE}
      </div>
      <Table
        columns={columns}
        dataSource={listGuest}
        pagination={false}
      />
      {
        listGuest?.length > limitPerPage && (
          <div className="pagination">
            <Pagination
              current={+currentPage}
              defaultPageSize={limitPerPage}
              total={totalGuest}
              onChange={handleChangePage}
            />
          </div>
        )
      }
      <ModalProfileGuest
        previewGuest={previewGuest}
        setPreviewGuest={setPreviewGuest}
      />
      <ModalListImage
        idGuest={idGuest}
        setIdGuest={setIdGuest}
      />
      <ModalDeleteGuest
        guestDelete={guestDelete}
        setGuestDelete={setGuestDelete}
      />
    </ListGuestStyled>
  );
};

export default ListGuestComponent;