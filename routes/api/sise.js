const controller = require('../../controllers/sise')
const validate = require('../../controllers/sise.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.post(
    '/request',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getSiseRequest,
    controller.getSiseRequest
)

router.post(
    '/trans',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getSiseTrans,
    controller.getSiseTrans
)

router.post(
    '/chart',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getSiseChart,
    controller.getSiseChart
)

module.exports = router