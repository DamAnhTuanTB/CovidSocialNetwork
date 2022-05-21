import { EyeOutlined } from '@ant-design/icons';
import { Button, DatePicker, Pagination, Table, Tag } from 'antd';
import moment from 'moment';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LIST_CHAT_CONSTANTS from './constants';
import { ListChatStyled } from './styled';
import { useGetListChatSessionsOfExpert } from '../../../hooks/chat/useChat';
import { useQueryClient } from 'react-query';
import { convertTime } from '../../../commons/utils';

const socket = io('http://localhost:8888');

const ListChatComponent = (props: any) => {
	const {
		isAdmin = false,
	} = props;
	const dateFormat = 'DD-MM-YYYY';
	const params = new URL(window.location.href);
	const paramsUrl = params.searchParams;

	const history = useHistory();
	const [dateSearch, setDateSearch] = useState<string>();
	const [currentPage, setCurrentPage] = useState(1);

	const queryClient = useQueryClient();

	const { data: listChatSessions } = useGetListChatSessionsOfExpert(currentPage);

	useEffect(() => {
		const date = paramsUrl.get('date');
		if (date) {
			setDateSearch(date);
		} else {
			setDateSearch(undefined);
		}
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
		history.push(`?page=${page}&limit=10`);
	}

	const handleSearch = () => {
		if (dateSearch) {
			history.push(`?date=${dateSearch}`);
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
						if (isAdmin) {
							history.push(`/admin/expert-management/detail-chat/${data.key}`)
						} else {
							history.push(`/expert/chat/${record.id}`)
						}
					}}
				/>
			),
		},
	];

	useEffect(() => {
		socket.on('expert_receiver_message', () => {
			queryClient.invalidateQueries('getListChatSessionsOfExpert')
		})

		socket.on('receive_end_chat_session', () => {
			queryClient.invalidateQueries('getListChatSessionsOfExpert')
		})
	}, []);

	return (
		<ListChatStyled>
			<div className={`list-chat ${isAdmin && "list-chat-admin"}`}>
				<div className="title">
					{LIST_CHAT_CONSTANTS.title}
				</div>
				<div className="search-bar">
					<DatePicker onChange={handleChangeDate} value={dateSearch ? moment(dateSearch, dateFormat) : undefined} format={dateFormat} />
					<Button className="button-search" type="primary" onClick={handleSearch}>Search</Button>
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

export default ListChatComponent;