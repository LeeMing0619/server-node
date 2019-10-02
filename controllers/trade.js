const utils = require('../middleware/utils')
const model = require('../models/tOrder')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getUserHistory = async (req, res) => {
    try {
        const username = req.query.username
        const bdate = req.query.bdate
        const edate = req.query.edate
        const merchandiseid = req.query.merchandiseid
        const marketid = req.query.marketid

        let results = await model.fetchUserTradeHistoryList(username, bdate, edate, merchandiseid, marketid);
        histories = results.map(history => {
            delete history.id
            delete history.MerchandiseTypeID
            delete history.MarketTypeID
            delete history.OrderTypeID
            delete history.volContract
            delete history.priceContract
            delete history.profit
            delete history.fee
            delete history.ordNumOrg
            delete history.orderLevel
            delete history.isRealContract
            delete history.ClientLevelTypeID
            delete history.RealOrdNum
            delete history.league
            return history
        });

        res.status(200).json(histories)
    } catch (error) {
        utils.handleError(res, error)
    }
}