import { Button, DatePicker, Input, Pagination, Space, Table, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ListChatStyled } from './styled';
import dataRecordChat from './fakeDataChat';
import { useHistory } from 'react-router-dom';

const ListChatComponent = (props: any) => {
	const {
		isAdmin = false,
	} = props;
	const dateFormat = 'DD-MM-YYYY';
	const params = new URL(window.location.href);
	const paramsUrl = params.searchParams;

	const history = useHistory();
	const [dateSearch, setDateSearch] = useState<string>();
	const [currentPage, setCurrentPage] = useState("1");

	useEffect(() => {
		const date = paramsUrl.get('date');
		if (date) {
			setDateSearch(date);
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
		// history.push(`?page=${page}`)
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
			dataIndex: 'time',
			key: 'time',
			width: 200,
		},
		{
			title: 'Bác sĩ',
			dataIndex: 'doctor',
			key: 'doctor',
			width: 230,
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: 'phone',
			width: 150,
		},
		{
			title: 'Thời lượng',
			dataIndex: 'totalTime',
			key: 'totalTime',
			width: 130,
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (status: any) => {
				const color = status === 1 ? "green" : "volcano";
				const text = status === 1 ? "Đang hoạt động" : "Đã kết thúc";
				return (
					<>
						<Tag color={color}>
							{text.toUpperCase()}
						</Tag>
					</>
				)
			},
			width: 150,
		},
		{
			title: '',
			key: 'action',
			render: (data: any) => (
				<EyeOutlined
					className="detail-action"
					onClick={() => {
						if (isAdmin) {
							history.push(`/admin/expert-management/detail-chat/${data.key}`)
						} else {
							history.push(`/expert/chat/${data.key}`)
						}
					}}
				/>
			),
		},
	];

	return (
		<ListChatStyled>
			<div className={`list-chat ${isAdmin && "list-chat-admin"}`}>
				<div className="title">
					Danh sách tin nhắn
				</div>
				<div className="search-bar">
					<DatePicker onChange={handleChangeDate} value={dateSearch ? moment(dateSearch, dateFormat) : undefined} format={dateFormat} />
					<Button className="button-search" type="primary" onClick={handleSearch}>Search</Button>
				</div>
				<Table columns={columns} dataSource={dataRecordChat} pagination={false} />
				<div className="pagination">
					<Pagination
						current={+currentPage}
						total={50}
						onChange={handleChangePage}
					/>
				</div>
			</div>
		</ListChatStyled>
	);
};

export default ListChatComponent;