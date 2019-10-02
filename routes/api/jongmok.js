const controller = require('../../controllers/jongmok')
const validate = require('../../controllers/jongmok.validate')
//const AuthController = require('../../controllers/auth')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Get item route
 */
router.get(
  '/:id',
  /* requireAuth,
  AuthController.roleAuthorization(['user']), */
  trimRequest.all,
  validate.getItemList,
  controller.getItemList
)

module.exports = router