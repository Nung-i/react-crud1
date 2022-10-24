const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

/**
 * 서버 스타트
 */
const port = 8080;
app.listen(port, () => {
	console.log(`node server start ${port}`);
	
});

/**
 * 리액트 보여줄 경로
 */
const react_build_path = path.resolve('build');
app.use(express.static(path.join(react_build_path, '')));

app.use(express.json());
app.use(cors());


/**
 * 가장 하단에 있을 것
 * '*' 이거는 리액트에게 라우팅 전권을 넘긴다는 뜻.
 */
app.get('*', (req, res) => {
	res.sendFile(path.join(react_build_path, '/index.html'))

});