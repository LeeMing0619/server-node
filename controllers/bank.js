const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const model = require('../models/tBankingIO')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getHistory = async (req, res) => {
    try {
        const start = req.query.bdate
        const end = req.query.edate
        const type = req.query.btype
        req = matchedData(req)
        const id = req.id

        let results = await model.fetchListByDateRange(id, type, start, end)
        const histories = results.map(data => {
            delete data.id
            delete data.BankingIOActor
            delete data.name
            delete data.bank
            delete data.bankAccount
            delete data.bankOwner
            delete data.Manager
            delete data.memo
            delete data.status
            delete data.ClientLevelTypeId
            delete data.league
            return data
        })

        res.status(200).json(histories)
    } catch (error) {
        utils.handleError(res, error)
    }
}