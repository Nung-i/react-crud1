import React from 'react';
import Header from './component/Header';
import { Container, CssBaseline } from '@mui/material';
import { Outlet } from "react-router-dom";

function App(){
	return (
		<>
		<CssBaseline/>
		
		<Header>
		</Header>
		
		<Container maxWidth='lg' sx={{marginTop:'50px'}}>
			<Outlet/>
		</Container>
		</>
	)

}

export default App;