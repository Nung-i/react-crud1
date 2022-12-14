const express = require('express');
const path = require('path');
const cors = require('cors');
const dayjs = require('dayjs');
const djs = dayjs();

/**
 * express 
 */
const app = express();

/**
 * 서버 스타트
 */
const port = 8080;
app.listen(port, () => {
	console.log(`node server start [:${port}] ${djs.format('YYYY-MM-DD HH:mm:ss')}`);
	
});

/**
 * 리액트 보여줄 경로
 */
const react_build_path = path.resolve('build');
app.use(express.static(path.join(react_build_path, '')));

app.use(express.json());
app.use(cors());


/**
 * 게시판 관련
 */
app.route('/api/boards')
.get((req, res) => {
	const boards_proc = require('./proc/boards_proc');
	boards_proc.boards_all(req.query, res);

})
.post((req, res) => {
	const boards_proc = require('./proc/boards_proc');
	let a = boards_proc.board_insert(req.body);

	// res.send('ok');
	res.send(a);

});
app.get('/api/boards/:board_seq', (req, res) => {
	const boards_proc = require('./proc/boards_proc');
	boards_proc.boards_row(req.params, res);

});


/**
 * 가장 하단에 있을 것
 * '*' 이거는 리액트에게 라우팅 전권을 넘긴다는 뜻.
 */
app.get('*', (req, res) => {
	res.sendFile(path.join(react_build_path, '/index.html'))

});