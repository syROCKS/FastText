

'use strict';
class QueryHandler {

	constructor() {
		this.Mongodb = require("./../config/db");
	}

	resetPass(username, newPass) {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB] = await this.Mongodb.onConnect();
				var myquery = { username: username };
				var newvalues = { $set: { password: newPass } };
				DB.collection("Users").updateOne(myquery, newvalues, function (error, result) {
					//this.Mongodb.close();
					if (error) {
						reject(error);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});

	}

	createLobby(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB] = await this.Mongodb.onConnect();
				DB.collection('Lobby').insertOne(data, function (error, result) {
					//this.Mongodb.close();
					if (error) {
						reject(error);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	getUserByUsername(username) {
		return new Promise(async (resolve, reject) => {

			try {

				const [DB] = await this.Mongodb.onConnect();

				DB.collection('Users').find({
					username: username
				}).toArray((error, result) => {
					//this.Mongodb.close();
					if (error) {
						reject(error);
					}
					resolve(result[0]);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	getLobbyByLobbyname(lobbyname) {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB] = await this.Mongodb.onConnect();
				DB.collection('Lobby').find({
					lobbyname: lobbyname
				}).toArray((error, result) => {
					//this.Mongodb.close();
					if (error) {
						reject(error);
					}
					resolve(result[0]);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	registerUser(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB] = await this.Mongodb.onConnect();
				DB.collection('Users').insertOne(data, function (error, result) {
					//this.Mongodb.close();
					if (error) {
						reject(error);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}
}

module.exports = new QueryHandler();