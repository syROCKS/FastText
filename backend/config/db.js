"use strict";
const mongodb = require('mongodb');
const assert = require('assert');

class Db{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
	}

	onConnect(){
		const mongoURL = process.env.DB_URL;
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(mongoURL, (err, db) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					var dbo = db.db("Fastext");
					assert.equal(null, err);
					resolve([dbo]);
				}
			});
		});
	}
}
module.exports = new Db();