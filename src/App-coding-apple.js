/* eslint-disable */

import React, { useState } from "react";
import './App.css';

function App() {

	let [글제목, 글제목변경] = useState(['남자 코트 추천', '리액트', '마장동 김씨']); // [a, b]

	let [따봉, 따봉변경] = useState(0);

	let posts = '남자 코드 추천';

	function like(){
		console.log(`1`);

	}

	function 글제목바꾸기(){
		let newArray = [...글제목];
		newArray[0] = '여자 코트 추천';
		글제목변경(newArray);
	}

	return (
		<div className="App">
			<div className="black-nav">
				<div>개발 Blog</div>
			</div>
			<button onClick={글제목바꾸기}>여자 코트 추천으로 바꿔라</button>
			<div className="list">
				<h3>{글제목[0]} <span onClick={()=>{따봉변경(따봉+1)}}>따봉</span> {따봉} </h3>
				<p>2월 17일 발행</p>
				<hr/>
			</div>
			<div className="list">
				<h3>{글제목[1]}</h3>
				<p>5월 25일 발행</p>
				<hr/>
			</div>
			<div className="list">
				<h3>{글제목[2]}</h3>
				<p>12월 01일 발행</p>
				<hr/>
			</div>
		</div>
	);
}

export default App;
