import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { Box, TextField, Button} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import serialize from 'form-serialize';

function Write(){
	const navigate = useNavigate();

	const [write_cancel_dialog_open, set_write_cancel_dialog_open] = useState(false);

	/* 작성취소 */
	const write_cancel = () => {
		set_write_cancel_dialog_open(true);

	};

	/* 작성취소 => 나가기 */
	const handle_write_cancel_dialog_ok = () => {
		set_write_cancel_dialog_open(false);
		navigate('/boards', {replace: true});
		
	};
	
	/* 작성취소 => 취소 */
	const handle_write_cancel_dialog_close = () => {
		set_write_cancel_dialog_open(false);

	};

	/* 작성완료 */
	const write_success = async () => {
		let data = serialize(document.querySelector('#board_form'), {hash: true, empty: true});

		try{
			const res_boards_post = await axios.post('/api/boards', data);

			if( res_boards_post.data==='ok' ){
				navigate('/boards', {replace: true});

			}

		}catch(err){
			console.log(err);

		}

	};

	return (
		<>
		<Box component='form' noValidate autoComplete='off' id='board_form'
			sx={{
				'& .MuiTextField-root': {my: 1, width: '100%'},
				paddingBottom: '20px',
			}}
		>
			{/* 제목 */}
			<Grid xs display='flex' justifyContent='center'>
				<TextField name='title' label='제목' required/>
			</Grid>

			{/* 내용 */}
			<Grid xs display='flex' justifyContent='center'>
				<TextField name='content' label='내용' required multiline minRows='20'/>
			</Grid>

			{/* 버튼들 */}
			<Grid xs display='flex' justifyContent='right'>
				{/* 취소 */}
				<Button onClick={write_cancel} variant='contained' color='error' 
					sx={{
					mr:'5px', width:'10%'
					}}
				>취소</Button>
				{/* 완료 */}
				<Button onClick={write_success} variant='contained' sx={{width:'10%'}}>완료</Button>
			</Grid>

		</Box>

		{/* 취소 다이얼로그 */}
		<Dialog open={write_cancel_dialog_open} onClose={handle_write_cancel_dialog_close}>
			<DialogTitle id="alert-dialog-title">변경사항이 저장되지 않을 수 있습니다.</DialogTitle>
			<DialogActions>
				<Button variant='contained' onClick={handle_write_cancel_dialog_ok}>나가기</Button>
				<Button variant='outlined' onClick={handle_write_cancel_dialog_close} autoFocus>머물기</Button>
			</DialogActions>
		</Dialog>
		</>
	);
}

export default Write;