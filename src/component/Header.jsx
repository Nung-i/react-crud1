import React from 'react';
import { Link } from 'react-router-dom';

function Header(props){
	const header_container_css = {
		height:'100px', 
		backgroundColor:'#000000',
		color: '#ffffff',
	};

	const menu_css = {
		listStyle: 'none',
	};
	const menu_item_css = {
		display: 'inline-block',
		padding: '0 10px',
	};

	return (
		<div className='my-row' style={header_container_css}>
			<div className='my-col-2'>
				<h1 style={{textAlign:'center'}}><Link to='/'>React Study</Link></h1>
			</div>
			<div className='my-col-10'>
				<ul style={menu_css}>
					<li style={menu_item_css}><Link to='/test-app'>테스트다</Link></li>
					<li style={menu_item_css}><Link to='/boards' style={{color:'yellow'}}>게시판</Link></li>
				</ul>
			</div>
		</div>
	);
}

export default Header;