import React from 'react';
import Wrapper from './test_component/Wrapper';
import Hello from './test_component/Hello';
import Counter from './test_component/Counter';
import InputSample from './test_component/InputSample';
import InputSample2 from './test_component/InputSample2';

function TestApp(){
	return (
		<Wrapper>
			{/* 주석은이렇게 써요 */}
			<Hello name="name_prop"/>
			<Hello/>
			<Hello/>
			<Hello/>

			<Counter/>
			<InputSample/>
			<InputSample2/>
		</Wrapper>
	)

}

export default TestApp;