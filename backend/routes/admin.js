/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const routeHandler = require('./../handlers/route-handler');

const router = express.Router();

router.post('/login', routeHandler.loginRouteHandler);
router.post('/joinlobby', routeHandler.joinlobbyRouteHandler);
router.post('/registerUser', routeHandler.registerUserRouteHandler);
router.post('/createLobby', routeHandler.createLobbyRouteHandler);
router.post('/verifyUser', routeHandler.verifyUserRouteHandler);
router.post('/resetPass', routeHandler.resetPassRouteHandler);

module.exports = router;
