const controller = require('../../controllers/user')
const validate = require('../../controllers/user.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
  '/joinTimeInfo/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getJoinTimeInfo,
  controller.getJoinTimeInfo
)

router.get(
  '/depositInfo/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getDepositInfo,
  controller.getDepositInfo
)

router.get(
  '/bankInfo/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getBankInfo,
  controller.getBankInfo
)

router.get(
  '/outbalanceInfo/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getOutbalanceInfo,
  controller.getOutbalanceInfo
)

router.get(
  '/userLoginChk/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getUserLoginChk,
  controller.getUserLoginChk
)

router.get(
  '/userIdChk/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getUserIdChk,
  controller.getUserIdChk
)

router.get(
  '/userOvernightInfo/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getUserOvernightInfo,
  controller.getUserOvernightInfo
)

router.get(
  '/newMember',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getNewMember,
  controller.getNewMember
)

module.exports = router