const controller = require('../../controllers/deposit')
const validate = require('../../controllers/deposit.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
  '/depositInfo/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getDepositInfo,
  controller.getDepositInfo
)

module.exports = router