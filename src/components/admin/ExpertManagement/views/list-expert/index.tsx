/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutlined, EyeOutlined, MessageOutlined } from '@ant-design/icons';
import { Button, Pagination, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { handleConvertDateStringToDate } from '../../../../../helpers/convertDateStringToDate';
import { useGetListExpert } from '../../../../../hooks/admin/useExpertAdmin';
import ModalDeleteExpert from '../modal-delete-expert';
import ModalCreateExpert from '../ModalCreateExpert';
import ModalProfileExpert from '../ModalProfileExpert';
import { ListExpertStyled } from './styled';

const TITLE = "Danh sách chuyên gia";

const ListExpertComponent = (props: any) => {

  const history = useHistory();
  const [listExpert, setListExpert] = useState([]);
  const [totalExpert, setTotalExpert] = useState(0);
  const [currentPage, setCurrentPage] = useState("1");
  const params = new URL(window.location.href);
  const paramsUrl = params.searchParams;

  const limitPerPage = 7;

  const [isShowModalCreate, setIsShowModalCreate] = useState(false);

  const [previewExpert, setPreviewExpert] = useState(null);
  const [expertDelete, setExpertDelete] = useState(null);

  const { dataExpert } = useGetListExpert({
    limit: limitPerPage,
    page: currentPage,
  });

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
          <MessageOutlined className="image-icon" onClick={() => history.push(`/admin/expert-management/list-chat/1`)} />
          <EyeOutlined className="seemore-icon" onClick={() => setPreviewExpert(data)} />
          <DeleteOutlined className="delete-icon" onClick={() => setExpertDelete(data)} />
        </Space>
      ),
    },
  ];

  const handleChangePage = (page: any) => {
    history.push(`?page=${page}`);
  }

  useEffect(() => {
    setCurrentPage(paramsUrl.get("page") || "1");
    if (dataExpert?.statusCode === 200) {
      setListExpert(dataExpert?.data);
      setTotalExpert(dataExpert?.total);
    }
  }, [params.href, dataExpert])


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
        dataSource={listExpert}
        pagination={false}
      />
      {
        totalExpert > limitPerPage && (
          <div className="pagination">
            <Pagination
              current={+currentPage}
              total={totalExpert}
              defaultPageSize={limitPerPage}
              onChange={handleChangePage}
            />
          </div>
        )
      }
      <ModalProfileExpert
        previewExpert={previewExpert}
        setPreviewExpert={setPreviewExpert}
      />
      <ModalCreateExpert
        isShowModalCreate={isShowModalCreate}
        setIsShowModalCreate={setIsShowModalCreate}
      />
      <ModalDeleteExpert
        expertDelete={expertDelete}
        setExpertDelete={setExpertDelete}
      />
    </ListExpertStyled>
  );
};

export default ListExpertComponent;