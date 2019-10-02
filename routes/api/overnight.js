const controller = require('../../controllers/overnight')
const validate = require('../../controllers/overnight.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
    '/userOverseaInfo/:id',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getUserOverseaInfo,
    controller.getUserOverseaInfo
)

router.get(
    '/userFutureInfo/:id',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getUserFutureInfo,
    controller.getUserFutureInfo
)

module.exports = router