const utils = require('../middleware/utils')
const model = require('../models/tNotice')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItemList = async (req, res) => {
    try {
        let notices = await model.fetchAllList();
        notices = notices.map(notice => {
            delete notice.id
            delete notice.idSend
            delete notice.league
            delete notice.mustRead

            return notice
        });
        
        res.status(200).json(notices)
    } catch (error) {
        utils.handleError(res, error)
    }
}