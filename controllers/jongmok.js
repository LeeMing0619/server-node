const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const model = require('../models/tJongmok')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItemList = async (req, res) => {
    try {
        req = matchedData(req)
        
        if (req.id == "cme") {
            req.id = "future"
        }

        let result = await model.fetchListByBundle(req.id)
        result = result.map(data => {
          delete data.id
          delete data.bundle
          return data
        })
        res.status(200).json(result)
    } catch (error) {
        utils.handleError(res, error)
    }
}