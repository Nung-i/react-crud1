import React, { useState } from 'react';

function InputSample2(){
	const [inputs, setInputs] = useState({
		user_id: '아이디',
		nickname: '닉네임',
	});

	const {user_id, nickname} = inputs;

	const on_change_text = (e) => {
		const {name, value} = e.target;

		setInputs({
			...inputs,
			[name]: value
		});

	};

	const on_reset = () => {
		setInputs({
			user_id: '아이디',
			nickname: '닉네임',
		});

	};

	return (
		<div>
			<input name='user_id' value={user_id} onChange={on_change_text} placeholder='아이디'/>
			<input name='nickname' value={nickname} onChange={on_change_text} placeholder='닉네임'/>
			<button type='button' onClick={on_reset}>초기화</button>
			<br/>
			<b>{user_id}({nickname})</b>
		</div>
	);
}

export default InputSample2;