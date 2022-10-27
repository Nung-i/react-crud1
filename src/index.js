import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import App from './App';
import TestApp from './TestApp';
import List from './component/board/List';
import Detail from './component/board/Detail';
import Write from './component/board/Write';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App/>}>
				<Route index element='index'></Route>
				<Route path='test-app' element={<TestApp/>}></Route>
				<Route path='boards'>
					<Route index element={<List/>}></Route>
					{/* <Route path=':board_seq' component={Detail}></Route> */}
					<Route path=':board_seq' element={<Detail/>}></Route>
					<Route path='write' element={<Write/>}></Route>
				</Route>
			</Route>
			<Route path='*' element='404'></Route>
		</Routes>
	</BrowserRouter>
);
