const { matchedData } = require('express-validator')
const model = require('../models/tEnvironment')
const utils = require('../middleware/utils')

exports.getDepositInfo = async (req, res) => {
    try {
        // unused, don't concerned

        req = matchedData(req)

        const results = await model.getItemsByName(req.id)

        const depoInfo = {};

        /*
        for (const result of results) {
            if (result.name == 'ENV_MAX_CONTRACT_FOREIGN_FUTURES') {
                depoInfo.foreignEnableBalance = result.value
            } else if (result.name == ) {

            }
        }
        */

        /*
        {
            : 
            foreignBuyBalance:
            foreignOvernight:
            futureBuyBalance:
            futureOvernight:
            nfutureBuyBalance:
            nfutureOvernight:
            optionLoan:
            optionBuyBalance:
            optionOvernight:
            noptionLoan:
            noptionBuyBalance:
            noptionOvernight:
            enableOrderBalance:
        }
        */

        res.status(200).json([depoInfos])
    } catch (error) {
        utils.handleError(res, error)
    }
}