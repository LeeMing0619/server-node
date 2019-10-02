const utils = require('../middleware/utils')
const model = require('../models/tOrder')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getTotOversea = async (req, res) => {
    try {
        let totOverseaProfits = await model.fetchTotOverseaProfitList(req.query.username, req.query.bdate, req.query.edate);
        totOverseaProfits = totOverseaProfits.map(totOverseaProfit => ({
            
        }));

        res.status(200).json(totOverseaProfits)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getOversea = async (req, res) => {
    try {
        let overseaProfits = await model.fetchOverseaProfitList(req.query.username, req.query.bdate, req.query.edate);
        overseaProfits = overseaProfits.map(overseaProfit => ({
            sonik: overseaProfit.sum_profit,
            totSonik: overseaProfit.sum_profit + overseaProfit.sum_fee,
            charge: overseaProfit.sum_fee
        }));

        res.status(200).json(overseaProfits)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getFuture = async (req, res) => {
    try {
        let overseaProfits = await model.fetchFutureProfitList(req.query.username, req.query.bdate, req.query.edate);
        overseaProfits = overseaProfits.map(overseaProfit => ({
            sonik: overseaProfit.sum_profit,
            totSonik: overseaProfit.sum_profit + overseaProfit.sum_fee,
            charge: overseaProfit.sum_fee
        }));

        res.status(200).json(overseaProfits)
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.getOption = async (req, res) => {
    try {
        let overseaProfits = await model.fetchOptionProfitList(req.query.username, req.query.bdate, req.query.edate);
        overseaProfits = overseaProfits.map(overseaProfit => ({
            sonik: overseaProfit.sum_profit,
            totSonik: overseaProfit.sum_profit + overseaProfit.sum_fee,
            charge: overseaProfit.sum_fee
        }));

        res.status(200).json(overseaProfits)
    } catch (error) {
        utils.handleError(res, error)
    }
}