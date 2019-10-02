const controller = require('../../controllers/notice')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
    '/list',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    controller.getItemList
)

module.exports = router