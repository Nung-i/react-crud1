import React from "react";

function Hello(props){
	return <div>안녕하세요. {props.name}</div>

}

Hello.defaultProps = {
	name: 'gjgj',
}

export default Hello;