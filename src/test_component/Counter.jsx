import React, {useState} from 'react';

function Counter(){
	const [count, setCount] = useState(0);

	const up_count = () => {
		setCount(count+1);

	}

	function down_count(){
		let res_count = count - 1;
		if( res_count < 0 ){
			res_count = 0;

		}

		setCount(res_count);

	}

	return (
		<>
		<h1>{count}</h1>
		<button type='button' onClick={up_count}>더하기</button>
		<button type='button' onClick={down_count}>빼기</button>
		</>
	);
}

export default Counter;