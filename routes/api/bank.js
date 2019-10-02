const controller = require('../../controllers/bank')
const validate = require('../../controllers/bank.validate')
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

module.exports = router