const queryHandler = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constant');

'use strict';
class RouteHandler {

	async resetPassRouteHandler(request, response) {
		const data = {
			username: (request.body.username).toLowerCase(),
			newPass: request.body.newPass

		};
		try {
			await queryHandler.resetPass(data.username, data.newPass);
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error: false,

				message: CONSTANTS.Password_updated
			});
		} catch (error) {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error: true,
				message: CONSTANTS.UNKNOWN_ERROR
			});
		}
	}

	async verifyUserRouteHandler(request, response) {
		const data = {
			username: (request.body.username).toLowerCase(),
			dob: request.body.dob,

		};
		try {
			const result = await queryHandler.getUserByUsername(data.username);
			if (result === null || result === undefined) {
				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error: true,
					message: CONSTANTS.USER_NOT_FOUND
				});
			}
			else if (data.dob != result.dob) {

				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error: true,
					message: CONSTANTS.Dateofbirth_does_match
				});
			}
			else {

				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error: false,
					message: CONSTANTS.Verified
				});
			}
		}
		catch (error) {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error: true,
				message: CONSTANTS.UNKNOWN_ERROR
			});
		}
	}

	async createLobbyRouteHandler(request, response) {
		const data = {
			lobbyname: (request.body.lobbyname).toLowerCase(),
			password: request.body.password
		};
		try {
			const result = await queryHandler.getLobbyByLobbyname(data.lobbyname);
			if (result != null && result != undefined) {
				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error: true,
					message: CONSTANTS.LOBBY_ALREADY_EXISTS
				});
			}
			else {
				const result = await queryHandler.createLobby(data);
				console.log(result)
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error: false,
					message: CONSTANTS.LOBBY_ADDED
				});
			}
		}
		catch (error) {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error: true,
				message: CONSTANTS.UNKNOWN_ERROR
			});
		}
	}

	async registerUserRouteHandler(request, response) {
		const data = {
			username: (request.body.username).toLowerCase(),
			password: request.body.password,
			dob: request.body.dob,
			name: request.body.name

		};
		try {
			const result = await queryHandler.getUserByUsername(data.username);
			if (result != null && result != undefined) {
				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error: true,
					message: CONSTANTS.USER_ALREADY_EXISTS
				});
			}

			else {
				const result = await queryHandler.registerUser(data);
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error: false,
					message: CONSTANTS.USER_ADDED
				});
			}
		}
		catch (error) {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error: true,
				message: CONSTANTS.UNKNOWN_ERROR
			});
		}
	}

	async loginRouteHandler(request, response) {
		const data = {
			username: (request.body.username).toLowerCase(),
			password: request.body.password
		};
		try {
			const result = await queryHandler.getUserByUsername(data.username);
			if (result === null || result === undefined) {

				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error: true,
					message: CONSTANTS.USER_NOT_FOUND
				});
			} else if (data.password != result.password) {

				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error: true,
					message: CONSTANTS.PASSWORD_INCORRECT
				});
			} else {

				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error: false,

					user: result.name,
					message: CONSTANTS.USER_LOGIN_OK
				});
			}
		} catch (error) {
			console.log('error');
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({

				error: true,
				message: CONSTANTS.UNKNOWN_ERROR
			});
		}
	}

	async joinlobbyRouteHandler(request, response) {
		const data = {
			lobbyname: (request.body.lobbyname).toLowerCase(),
			password: request.body.password
		};
		try {
			const result = await queryHandler.getLobbyByLobbyname(data.lobbyname);
			if (result === null || result === undefined) {
				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error: true,
					message: CONSTANTS.LOBBY_NOT_FOUND
				});
			} else if (data.password != result.password) {
				response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
					error: true,
					message: CONSTANTS.PASSWORD_INCORRECT
				});
			} else {
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error: false,
					message: CONSTANTS.LOBBY_LOGIN_OK
				});
			}
		} catch (error) {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error: true,
				message: CONSTANTS.UNKNOWN_ERROR
			});
		}
	}

}

module.exports = new RouteHandler();