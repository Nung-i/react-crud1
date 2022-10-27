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
	const chinook_conn = db_connect();

	let promise1 = await new Promise((resolve, reject) => {
		let boards_cnt_sql = `SELECT COUNT(*) AS cnt FROM boards`;
		chinook_conn.get(boards_cnt_sql, function(err, row){
			if(err){
				reject(err);
			}

			resolve(row.cnt);
	
		});

	});

	let promise = await new Promise((resolve, reject) => {
		const page = Number(data.page) || 0;
		const row_num = Number(data.row_per_page) || 10;

		let limit = `LIMIT ${(page)*row_num}, ${row_num}`;

		let boards_all_sql = `SELECT * FROM boards ${limit}`;
		chinook_conn.all(boards_all_sql, function(err, rows){
			if(err){
				reject(err);
			}

			resolve(rows);
	
		});

		
	});

	db_close(chinook_conn);

	const total_cnt = promise1;

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

	rrrr.send({
		total_cnt: total_cnt,
		list: boards_data,
	});

	// return promise;

}

async function boards_row(data, rrrr){
	const board_seq = Number(data.board_seq) || null;

	let promise = null;

	if( board_seq ){
		const chinook_conn = db_connect();
	
		promise = await new Promise((resolve, reject) => {
			let boards_row_sql = `SELECT * FROM boards WHERE seq = ${board_seq}`;
			chinook_conn.get(boards_row_sql, function(err, row){
				if(err){
					reject(err);
				}
				
				resolve(row);
		
			});
	
		});
	
		db_close(chinook_conn);

	}

	rrrr.send(promise);

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
module.exports.boards_row = boards_row;