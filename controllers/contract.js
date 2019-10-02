const { matchedData } = require('express-validator')
const model = require('../models/tClient')
const utils = require('../middleware/utils')

exports.getUserContractInfo = async (req, res) => {
    try {
        req = matchedData(req)

        const result = await model.getItemsByName(req.id)
        const contract = result.map(data => ({
            foreignFuturesMaxContract: data.foreignFuturesMaxContract,
            futuresMaxContract: data.futuresMaxContract,
            optionsBuyMaxContract: data.optionsBuyMaxContract,
            optionsSellMaxContract: data.optionsSellMaxContract,
            cmemaxContract: data.futuresMaxContract,
            eurexbuyMaxContract: data.futuresMaxContract,
            eurexsellMaxContract: data.futuresMaxContract
        }))

        res.status(200).json(contract[0])
    } catch (error) {
        utils.handleError(res, error)
    }
}
