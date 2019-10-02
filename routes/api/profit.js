const controller = require('../../controllers/profit')
const validate = require('../../controllers/profit.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
    '/totOversea',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getTotOversea,
    controller.getTotOversea
)

router.get(
    '/totFuture',
    trimRequest.all,
    validate.getTotOversea,
    controller.getTotOversea
)

router.get(
    '/totOption',
    trimRequest.all,
    validate.getTotOversea,
    controller.getTotOversea
)

router.get(
    '/oversea',
    /* requireAuth,
    AuthController.roleAuthorization(['user']), */
    trimRequest.all,
    validate.getOversea,
    controller.getOversea
)

router.get(
    '/future',
    trimRequest.all,
    validate.getOversea,
    controller.getFuture
)

router.get(
    '/option',
    trimRequest.all,
    validate.getOversea,
    controller.getOption
)

module.exports = router