const controller = require('../../controllers/company')
const validate = require('../../controllers/company.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
    '/bankinfo',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    controller.getBankInfo
)

router.get(
    '/fkDepositInfo/:id',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getFKDepositInfo,
    controller.getFKDepositInfo
)

module.exports = router