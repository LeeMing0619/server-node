const { validationResult } = require('../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates get item request
 */
exports.getItemList = [
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validationResult(req, res, next)
    }
  ]