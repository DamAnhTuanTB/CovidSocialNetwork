import { EyeOutlined } from '@ant-design/icons';
import { Button, DatePicker, Pagination, Table, Tag, Select } from 'antd';
import moment from 'moment';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import LIST_CHAT_CONSTANTS from './constants';
import { ListChatStyled } from './styled';
import { useGetListChatSessionsOfExpertAdmin } from '../../../hooks/chat/useChat';
import { useQueryClient } from 'react-query';
import { convertTime } from '../../../commons/utils';

const socket = io('http://localhost:4444');

const ListChatAdminComponent = (props: any) => {
    const { id_expert }: any = useParams();
    localStorage.setItem('id_expert_list_chat', id_expert);
    const dateFormat = 'DD-MM-YYYY';
    const params = new URL(window.location.href);
    const paramsUrl = params.searchParams;

    const history = useHistory();
    const [dateSearch, setDateSearch] = useState<any>();
    const [statusSearch, setStatusSearch] = useState<any>();
    const [currentPage, setCurrentPage] = useState(1);

    const [dateParam, setDateParam] = useState<any>();
    const [statusParam, setStatusParam] = useState<any>();

    const queryClient = useQueryClient();

    const { data: listChatSessions } = useGetListChatSessionsOfExpertAdmin(Number(localStorage.getItem('id_expert')), dateParam, statusParam, currentPage);

    useEffect(() => {
        const date = paramsUrl.get('date');
        const status = paramsUrl.get('status');
        if (date) {
            setDateSearch(date);
            setDateParam(date);
        }
        if (status) {
            setStatusSearch(status);
            setStatusParam(status);
        }
        queryClient.invalidateQueries('getListChatSessionsOfExpertAdmin');
    }, [params.href])

    const handleChangeDate = (value: any) => {
        if (value) {
            setDateSearch(value.format(dateFormat));
        } else {
            setDateSearch(undefined);
        }
    }

    const handleChangePage = (page: any) => {
        setCurrentPage(page);
        if (dateSearch && statusSearch) {
            history.push(`?date=${dateSearch}&status=${statusSearch}&page=${page}&limit=10`);
        } else if (dateSearch && !statusSearch) {
            history.push(`?date=${dateSearch}&page=${page}&limit=10`);
        } else if (!dateSearch && statusSearch) {
            history.push(`?status=${statusSearch}&page=${page}&limit=10`)
        } else {
            history.push(`?page=${page}&limit=10`);
        }
        queryClient.invalidateQueries('getListChatSessionsOfExpert');
    }

    const onChangeSelect = (value: string) => {
        setStatusSearch(value);
    };

    const handleSearch = () => {
        setDateParam(dateSearch);
        setStatusParam(statusSearch);
        setCurrentPage(1);
        if (dateSearch && statusSearch) {
            history.push(`?date=${dateSearch}&status=${statusSearch}`);
        } else if (dateSearch && !statusSearch) {
            history.push(`?date=${dateSearch}`);
        } else if (!dateSearch && statusSearch) {
            history.push(`?status=${statusSearch}`)
        } else {
            history.push('?')
        }
    }

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (data: any, record: any) => {
                return (
                    <div>
                        {record?.updatedAt ? convertTime(record?.updatedAt) : convertTime(record?.startedAt)}
                    </div>
                )
            }
        },
        {
            title: 'Bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
            render: (data: any, record: any) => {
                return (
                    <div>
                        <img src={record.patientAvatar} width="30px" height="30px"></img>
                        &nbsp;
                        {data}
                    </div>
                )
            }
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (status: any, record: any) => {
                const color = !record.isEnd ? "green" : "volcano";
                const text = !record.isEnd ? "Đang hoạt động" : "Đã kết thúc";
                return (
                    <>
                        <Tag color={color}>
                            {text.toUpperCase()}
                        </Tag>

                        {(!record.isEnd && Number(record.isNew) === 1) &&
                            <Tag color="blue">
                                CÓ TIN NHẮN MỚI
                            </Tag>
                        }

                        {
                            (record.isEnd && Number(record.isNew) === 1) &&
                            <Tag color="blue">
                                CHƯA ĐỌC
                            </Tag>
                        }
                    </>
                )
            },
        },
        {
            title: '',
            key: 'action',
            render: (data: any, record: any) => (
                <EyeOutlined
                    className="detail-action"
                    onClick={() => {
                        history.push(`/admin/expert-management/detail-chat/${record.id}`)
                    }}
                />
            ),
        },
    ];

    useEffect(() => {
        socket.on('expert_receiver_message', (data) => {
            if (Number(data.expertId) === Number(id_expert)) {
                queryClient.invalidateQueries('getListChatSessionsOfExpertAdmin');
            }
        })
        socket.on('receive_end_chat_session', (data) => {
            console.log(data);
            if (Number(data.expertId) === Number(id_expert)) {
                queryClient.invalidateQueries('getListChatSessionsOfExpertAdmin');
            }
        })
        socket.on('admin_receiver_expert_read_message', (data) => {
            if (Number(data.expertId) === Number(id_expert)) {
                queryClient.invalidateQueries('getListChatSessionsOfExpertAdmin');
            }
        })
    }, []);

    return (
        <ListChatStyled>
            <div className={`list-chat list-chat-admin`}>
                <div className="title">
                    {LIST_CHAT_CONSTANTS.title}
                </div>
                <div className="search-bar">
                    <Button className="button-search" type="primary" onClick={handleSearch}>Search</Button>
                    <Select
                        value={statusSearch}
                        style={{ width: 150 }}
                        placeholder="Select a status"
                        optionFilterProp="children"
                        onChange={onChangeSelect}
                    >
                        <Select.Option value="1">Đang hoạt động</Select.Option>
                        <Select.Option value="2">Đã kết thúc</Select.Option>
                        <Select.Option value="3">Tất cả</Select.Option>
                    </Select>
                    &nbsp;
                    &nbsp;
                    <DatePicker style={{ width: 150 }} onChange={handleChangeDate} value={dateSearch ? moment(dateSearch, dateFormat) : undefined} format={dateFormat} />
                </div>
                <Table columns={columns} dataSource={listChatSessions?.data} pagination={false} />
                <div className="pagination">
                    <Pagination
                        current={+currentPage}
                        total={listChatSessions?.total}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </ListChatStyled>
    );
};

export default ListChatAdminComponent;