const controller = require('../../controllers/message')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

router.post(
    '/pnl/:id',
    trimRequest.all,
    controller.postUserState
)

/*
 * Get item route
 */
router.post(
    '/:category/:id',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    controller.postFuture
)

module.exports = router