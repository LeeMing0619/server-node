const controller = require('../../controllers/contract')
const validate = require('../../controllers/contract.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
  '/userContractInfo/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getUserContractInfo,
  controller.getUserContractInfo
)

module.exports = router