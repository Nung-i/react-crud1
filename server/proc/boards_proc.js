const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dayjs = require('dayjs');
const { ConnectingAirportsOutlined } = require('@mui/icons-material');

const dayjs1 = dayjs();

/**
 * 게시물 등록 
 * 
 * @param {*} data 
 * @returns 
 */
async function board_insert(data){
	const title 		= data.title || '';
	const content 		= data.content || '';

	let res = null;

	if(title!=='' && content!==''){
		const chinook_conn = db_connect();

		let boards_insert_data = {
			title: title,
			content: content,
			author: '포도 리',
			reg_date: dayjs1.format('YYYY-MM-DD HH:mm:ss'),
		}
		let boards_insert_sql = get_insert_sql('boards', boards_insert_data);
		
		res = await new Promise((resolve,reject) => {
			chinook_conn.run(boards_insert_sql, function(err, data){
				if(err){
					reject(err);
				}
	
				resolve(this);
	
			});

		}) 

		db_close(chinook_conn);

	}
	
	return res;

}

/**
 * boards all로 가져오기
 * 
 * @param {*} data 
 */
async function boards_all(data, rrrr){
	// const page = Number(data.page) || 1;
	// const row_num = 10;

	// let limit = `LIMIT ${(page-1)*row_num}, ${row_num}`;

	let promise = await new Promise((resolve, reject) => {
		const page = Number(data.page) || 1;
		const row_num = 10;

		let limit = `LIMIT ${(page-1)*row_num}, ${row_num}`;

		const chinook_conn = db_connect();

		let boards_all_sql = `SELECT * FROM boards ${limit}`;
		chinook_conn.all(boards_all_sql, function(err, rows){
			if(err){
				reject(err);
			}

			resolve(rows);
	
		});

		db_close(chinook_conn);

	});

	const boards_data = [];
	promise.forEach((v, i, array) => {
		const board_data = {
			"id": v.seq,
			"번호": v.seq,
			"제목": v.title,
			"작성자": v.author,
			"등록일": v.reg_date,
			"조회수": v.hits,
		}
		boards_data.push(board_data);

	});

	rrrr.send(boards_data);

	// return promise;

}

/**
 * 
 * @param {string} table_name 
 * @param {*} data 
 * @returns 
 */
function get_insert_sql(table_name, data){
	let sql = '';

	if( table_name && data ){
		const data_keys 		= [];
		const data_values 		= [];
	
		for(let [key, value] of Object.entries(data)){
			data_keys.push(`\`${key}\``);
			data_values.push(`'${value}'`);
	
		}
	
		sql = `INSERT INTO ${table_name} (${data_keys.join(', ')}) VALUES (${data_values.join(', ')})`;

	}

	return sql;

}

/**
 * sqlite3 connect
 */
function db_connect(){
	const db_path = path.join(path.resolve('db'), 'chinook.db');
	const db = new sqlite3.Database(db_path, function(err){
		if(err){
			console.error(err.message);
	
		}else{
			console.log(`Connected to the chinnok database.`);

		}
	
	});
	
	return db;

}

/**
 * db close
 */
function db_close(db){
	db.close(function(err){
		if(err){
			return console.log(err.message);
	
		}else{
			console.log(`Close the database connection.`);

		}
	
	
	});

}

module.exports.board_insert = board_insert;
module.exports.boards_all = boards_all;