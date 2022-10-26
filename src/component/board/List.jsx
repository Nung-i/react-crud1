import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import { Box, TextField, Button} from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TablePagination } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

function List(){
	let [listAll, setListAll] = useState([]);

	useEffect(() => {
		axios.get('http://127.0.0.1:8080/api/boards', {
			params: {
				page: 1,
			}
		})
		.then((res) => { 	// 성공
			setListAll(res.data);

		})
		.catch((err) => { 	// 에러
			console.log(err);
		})
		.then(() => { 	// 항상

		});

		return() => {

		};

	}, []);

	const navigate = useNavigate();

	const goBoard = (id, e) => {
		navigate(`/boards/${id}`)

	}

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		// '&:nth-of-type(odd)': {
		// 	backgroundColor: theme.palette.action.hover,
		// },
		// hide last border
		'&:last-child td, &:last-child th': {
			border: 0,
		},
		'&:hover': {
			backgroundColor: theme.palette.action.hover,
			cursor: 'pointer',
		},
	}));

	return (
		<Box>
			<Grid xs display='flex' justifyContent='right'>
				<Button variant='contained' component={Link} to='/boards/write'>작성하기</Button>
			</Grid>
			<Grid xs display='flex' justifyContent='right'>
				<TableContainer component={Paper} sx={{'margin-top': '10px'}}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell align='center'>제목</StyledTableCell>
								<StyledTableCell align='center'>작성자</StyledTableCell>
								<StyledTableCell align='center'>등록일</StyledTableCell>
								<StyledTableCell align='center'>조회수</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
						{listAll.map((list_row, list_index) => (
							<StyledTableRow onClick={goBoard.bind(this, list_row.id)}>
								<TableCell align='center'>{list_row.제목}</TableCell>
								<TableCell align='center'>{list_row.작성자}</TableCell>
								<TableCell align='center'>{list_row.등록일}</TableCell>
								<TableCell align='center'>{list_row.조회수}</TableCell>
							</StyledTableRow>
						))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
									colSpan={3} count={rows.length} rowsPerPage={rowsPerPage} page={page}
									SelectProps={{
										inputProps: {
										'aria-label': 'rows per page',
										},
										native: true,
									}}
									onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Grid>
			<Outlet/>
		</Box>
	);
}

export default List;