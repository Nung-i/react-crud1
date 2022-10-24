import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Outlet } from "react-router-dom";

function List(){
	const list_css = {
		width: '100%',
		borderCollapse: 'collapse',
		marginTop: '10px',
	}
	const list_th_css = {
		border: '1px solid grey',
	}
	const list_td_css = {
		border: '1px solid grey',
	}

	return (
		<div className='my-row'>
			<div className='my-col'>
				<div>
					<Button variant='contained' component={Link} to='/boards/write'>작성하기</Button>

					<table style={list_css}>
						<thead style={{backgroundColor:'grey', color:'white'}}>
							<tr>
								<th style={list_th_css}>No</th>
								<th style={list_th_css}>제목</th>
								<th style={list_th_css}>작성자</th>
								<th style={list_th_css}>등록일</th>
								<th style={list_th_css}>조회수</th>
							</tr>
						</thead>
						<tbody style={{textAlign:'center'}}>
							<tr>
								<td style={list_td_css}>1</td>
								<td style={list_td_css}>제목</td>
								<td style={list_td_css}>작성자</td>
								<td style={list_td_css}>등록일</td>
								<td style={list_td_css}>조회수</td>
							</tr>
						</tbody>
					</table>

				</div>
			</div>
			<Outlet/>
		</div>
	);
}

export default List;