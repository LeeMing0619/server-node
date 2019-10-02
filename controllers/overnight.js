const { matchedData } = require('express-validator')
const model = require('../models/tClient')
const utils = require('../middleware/utils')

exports.getUserOverseaInfo = async (req, res) => {
    try {
        req = matchedData(req)

        const results = await model.getItemsByName(req.id)
        results = results.map(data => ({
            hcodeName: data.hcodeName,
            hbasicCode: data.hbasicCode,
            hmargin1: data.hmargin1,
            hmargin2: data.hmargin2,
            hmargin3: data.hmargin3,
            userMarginIdx: data.userMarginIdx
        }))

        res.status(200).json(results)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getUserFutureInfo = async (req, res) => {
    try {
        req = matchedData(req)

        const results = await model.getItemsByName(req.id)
        results = results.map(data => ({
            tcode: data.tcode,
            userMarginIdx: data.userMarginIdx
        }))

        res.status(200).json(results)
    } catch (error) {
        utils.handleError(res, error)
    }
}
