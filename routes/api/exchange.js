const controller = require('../../controllers/exchange')
const validate = require('../../controllers/exchange.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
    '/history/:id',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getHistory,
    controller.getHistory
)

router.get(
    '/currExchange',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    controller.getCurrExchange
)

module.exports = router