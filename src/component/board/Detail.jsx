import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import { Box, Paper } from "@mui/material";
import { Button } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';


export default function Detail(){
	const {board_seq} = useParams();
	const [boardRow, setBoardRow] = useState();

	const theme = useTheme();

	useEffect(() => {
		axios.get(`/api/boards/${board_seq}`, {
			baseURL: 'http://127.0.0.1:8080',
		})
		.then((res) => { 	// 성공
			setBoardRow(res.data);

		})
		.catch((err) => { 	// 에러
			console.log(err);
		})
		.then(() => { 	// 항상

		});

		return () => {

		}

	}, [board_seq]);

	return (
		<Box>
			<Paper style={{minHeight: '600px', padding: '5px 15px'}}>
				{boardRow ? <>
					<Grid style={{marginTop: '15px'}}>
						<Grid>
							<h1>{boardRow.title}</h1>
						</Grid>
						<Grid>
							<p style={{color: theme.palette.grey[500]}}><b>{boardRow.author} {boardRow.reg_date}</b></p>
						</Grid>
					</Grid>
					<hr/>
					<Grid xs display='flex'>
						{boardRow.content}
					</Grid>
					</>
					: <><Grid style={{marginTop: '15px'}}><Grid>존재하지 않거나, 삭제된 게시물입니다.</Grid></Grid></>
				}
			</Paper>
			<Grid xs display='flex' justifyContent='right' sx={{mt:'10px'}}>
				<Button component={Link} to={'/boards'} variant='contained' sx={{width:'10%'}}>목록</Button>
			</Grid>
		</Box>
	);
}