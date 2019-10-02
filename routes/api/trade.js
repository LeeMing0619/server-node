const controller = require('../../controllers/trade')
const validate = require('../../controllers/trade.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
    '/userHistory',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getUserHistory,
    controller.getUserHistory
)

module.exports = router