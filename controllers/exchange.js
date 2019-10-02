const { matchedData } = require('express-validator')
const model = require('../models/tClient')
const utils = require('../middleware/utils')

exports.getHistory = async (req, res) => {
    try {
        req = matchedData(req)

        const results = await model.getItemsByName(req.id)
        results = results.map(data => ({
            type: data.type,
            won: data.won,
            usd: data.usd,
            exchangeRate: data.exchangeRate,
            date: data.date,
        }))

        res.status(200).json(results)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getCurrExchange = async (req, res) => {
    try {
        req = matchedData(req)

        const results = await model.getItemsByName(req.id)
        results = results.map(data => ({
            exRate: data.exRate,
        }))

        res.status(200).json(results)
    } catch (error) {
        utils.handleError(res, error)
    }
}
