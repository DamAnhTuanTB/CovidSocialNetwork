import { Button, DatePicker, Input, Space, Table, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ListChatStyled } from './styled';
import dataRecordChat from './fakeDataChat';
import { useHistory } from 'react-router-dom';

const ListChatComponent = (props: any) => {
	const dateFormat = 'DD-MM-YYYY';
	const params = new URL(window.location.href);
  const paramsUrl = params.searchParams;

	const history = useHistory();
	const [dateSearch, setDateSearch] = useState<string>();

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

	const handleSearch = () => {
		if (dateSearch) {
			history.push(`/expert/chat?date=${dateSearch}`);
		} else {
			history.push('/expert/chat')
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
			)},
			width: 150,
		},
		{
			title: '',
			key: 'action',
			render: (data: any) => (
				<EyeOutlined className="detail-action" onClick={() => history.push(`/expert/chat/${data.key}`)} />
			),
		},
	];

	return (
		<ListChatStyled>
			<div className="list-chat">
				<div className="title">
					Danh sách tin nhắn
				</div>
				<div className="search-bar">
					<DatePicker onChange={handleChangeDate} value={dateSearch ? moment(dateSearch, dateFormat) : undefined} format={dateFormat} />
					<Button className="button-search" type="primary" onClick={handleSearch}>Search</Button>
				</div>
				<Table columns={columns} dataSource={dataRecordChat} pagination={{ pageSize: 5 }} />
			</div>
		</ListChatStyled>
	);
};

export default ListChatComponent;