const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

/**
 * sqlite3 connect
 */
// const db_path = path.join(path.resolve('db'), 'chinook.db');
// const db = new sqlite3.Database(db_path, (err) => {
// 	if(err){
// 		console.error(err.message);

// 	}

// 	console.log(`Connected to the chinnok database.`);

// });


// db.get(`SELECT * FROM sqlite_master`, (err, row) => {
// 	if(err){
// 		throw err;

// 	}

// 	console.log(row);

// });

// db.all(`SELECT * FROM sqlite_master WHERE type = 'table'`, (err, rows) => {
// 	if(err){
// 		throw err;

// 	}

// 	rows.forEach((row) => {
// 		console.log(row);

// 	});

// });

/**
 * express 
 */
const app = express();

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
 * sqlite3 close
 */
// db.close((err) => {
// 	if(err){
// 		return console.log(err.message);

// 	}

// 	console.log(`Close the database connection.`);

// });

/**
 * 가장 하단에 있을 것
 * '*' 이거는 리액트에게 라우팅 전권을 넘긴다는 뜻.
 */
app.get('*', (req, res) => {
	switch(req.url){
		case '/api':
			console.log(req);
			res.send('hi!');
			break;

		default :
			res.sendFile(path.join(react_build_path, '/index.html'))
			break;

	}

});

// const router = express.Router();
// router.get('/api', (req, res) => {
// 	console.log('req', req);
// 	console.log('res', res);
// 	res.send('Hellow World');

// });

app.route('/api')
	.get((req, res) => {
		console.log(`왓냐`);
		res.send('GET | Hellow World');
	});
