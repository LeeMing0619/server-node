const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const modelEnv = require('../models/tEnvironment')
const model = require('../models/tBankInfo')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getBankInfo = async (req, res) => {
    try {
        let banks = await model.fetchAllList();
        banks = banks.map(bank => {
          delete bank.id
          return bank;
        })
        res.status(200).json(banks)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getFKDepositInfo = async (req, res) => {
    try {
        req = matchedData(req)

        const result = await modelEnv.getDepositesByName('ENV_OVERNIGHT_DEPOSIT_FOREIGN_FUTURES', 'ENV_OVERNIGHT_DEPOSIT_FUTURES');
        let deposit

        for (const r of result) {
            if (r.name == "ENV_OVERNIGHT_DEPOSIT_FOREIGN_FUTURES") {
                deposit.ENV_OVERNIGHT_DEPOSIT_FOREIGN_FUTURES = r.value
            } else if (r.name == "ENV_OVERNIGHT_DEPOSIT_FUTURES") {
                deposit.ENV_OVERNIGHT_DEPOSIT_FUTURES = r.value
            }
        }

        res.status(200).json([deposit])
    } catch (error) {
        utils.handleError(res, error)
    }
}