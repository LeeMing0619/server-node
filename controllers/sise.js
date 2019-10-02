const { matchedData } = require('express-validator')
const model = require('../models/tClient')
const utils = require('../middleware/utils')

exports.getSiseRequest = async (req, res) => {
    try {
        req = matchedData(req)
        const id = req.id
        const type = req.type
        const req1 = req.req
        const code = req.code
        const cme = req.cme
        const seq = req.seq

        const result = await clientModel.getItemsByName(id, type, req1, code, cme, seq)
        const contract = result.map(data => ({
            //foreignFuturesMaxContract: data.foreignFuturesMaxContract,
            //futuresMaxContract: data.futuresMaxContract,
            //optionsBuyMaxContract: data.optionsBuyMaxContract,
            //optionsSellMaxContract: data.optionsSellMaxContract,
            //cmemaxContract: data.bankBalance,
            //eurexbuyMaxContract: data.bankBalance,
            //eurexsellMaxContract: data.bankBalance
        }))

        if (contract.length > 0) {
            res.status(200).json(contract[0])
        } else {
            res.status(400)
        }
        
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getSiseTrans = async (req, res) => {
    try {
        req = matchedData(req)
        const id = req.id
        const tr = req.tr

        const result = await clientModel.getItemsByName(id, tr)
        const contract = result.map(data => ({
            //foreignFuturesMaxContract: data.foreignFuturesMaxContract,
            //futuresMaxContract: data.futuresMaxContract,
            //optionsBuyMaxContract: data.optionsBuyMaxContract,
            //optionsSellMaxContract: data.optionsSellMaxContract,
            //cmemaxContract: data.bankBalance,
            //eurexbuyMaxContract: data.bankBalance,
            //eurexsellMaxContract: data.bankBalance
        }))

        if (contract.length > 0) {
            res.status(200).json(contract[0])
        } else {
            res.status(400)
        }
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getSiseChart = async (req, res) => {
    try {
        req = matchedData(req)
        const code = req.code
        const time = req.time

        const result = await clientModel.getItemsByName(code, time)
        const contract = result.map(data => ({
            //foreignFuturesMaxContract: data.foreignFuturesMaxContract,
            //futuresMaxContract: data.futuresMaxContract,
            //optionsBuyMaxContract: data.optionsBuyMaxContract,
            //optionsSellMaxContract: data.optionsSellMaxContract,
            //cmemaxContract: data.bankBalance,
            //eurexbuyMaxContract: data.bankBalance,
            //eurexsellMaxContract: data.bankBalance
        }))

        res.status(200).json({datalist: contract})
    } catch (error) {
        utils.handleError(res, error)
    }
}
