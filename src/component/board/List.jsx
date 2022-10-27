import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TablePagination } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, IconButton } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";



/**
 * 페이지네이션 이벤트
 * @param {*} props 
 * @returns 
 */
function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event,) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
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

function List(){
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [listCnt, setListCnt] = useState(0);
	const [listAll, setListAll] = useState([]);

	useEffect(() => {
		axios.get('/api/boards', {
			params: {
				page: page,
				row_per_page: rowsPerPage,
			},
			baseURL: 'http://127.0.0.1:8080',
		})
		.then((res) => { 	// 성공
			setListCnt(res.data.total_cnt);
			setListAll(res.data.list);

		})
		.catch((err) => { 	// 에러
			console.log(err);
		})
		.then(() => { 	// 항상

		});

		return() => { 	// 페이지 나갈 때

		};

	}, [page, rowsPerPage]);

	const navigate = useNavigate();

	/**
	 * 상세 이동
	 * @param {number} id 
	 * @param {*} e 
	 */
	const goBoard = (id, e) => {
		navigate(`/boards/${id}`)

	}

	const handleChangePage = (event, newPage,) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event,) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); 
	};

	return (
		<Box>
			<Grid xs display='flex' justifyContent='right'>
				<Button variant='contained' component={Link} to='/boards/write'>작성하기</Button>
			</Grid>
			<Grid xs display='flex' justifyContent='right'>
				<TableContainer component={Paper} sx={{marginTop: '10px'}}>
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
							<StyledTableRow key={list_row.id} onClick={goBoard.bind(this, list_row.id)}>
								<TableCell align='center'>{list_row.제목}</TableCell>
								<TableCell align='center'>{list_row.작성자}</TableCell>
								<TableCell align='center'>{list_row.등록일}</TableCell>
								<TableCell align='center'>{list_row.조회수}</TableCell>
							</StyledTableRow>
						))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination rowsPerPageOptions={[5, 10, 25]}
									colSpan={4} count={listCnt} rowsPerPage={rowsPerPage} page={page}
									SelectProps={{
										inputProps: {
											'aria-label': 'n 개씩 보기',
										},
										native: true,
									}}
									onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} 
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Grid>
		</Box>
	);
}

export default List;