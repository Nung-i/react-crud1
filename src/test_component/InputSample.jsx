import React, { useState } from 'react';

function InputSample(){
	const [abcText, setAbcText] = useState('');

	const inputAbcText = (e) => {
		setAbcText(e.target.value);

	};

	const reset = () => {
		setAbcText('');

	};

	return (
		<div>
			<input type="text" name="abc" onChange={inputAbcText} value={abcText}/>
			<button type='button' onClick={reset}>초기화</button>
			<div>
				<b>값: {abcText}</b>
			</div>
		</div>
	);
}

export default InputSample;