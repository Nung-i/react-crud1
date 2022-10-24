import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import TestApp from './TestApp';
import './index.css';
import List from './component/board/List';
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
					<Route path='write' element={<Write/>}></Route>
				</Route>
			</Route>
			<Route path='*' element='404'></Route>
		</Routes>
	</BrowserRouter>
);
