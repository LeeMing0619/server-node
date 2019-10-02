const { sql, poolPromise } = require('../config/db');

class tBankingIO {
    constructor(
        num, 
        id, 
        BankingIOType, 
        BankingIOActor, 
        name, dateRequest, 
        amountRequest, 
        bank, 
        bankAccount, 
        bankOwner, 
        Manager, 
        dateConfirm, 
        amountConfirm, 
        memo, 
        status, 
        ClientLevelTypeID, 
        league) {
    }

    getTableName() {
        return this.constructor.name
    }

    async fetchListByDateRange(name, type, start, end) {
        const pool = await poolPromise

        const request = pool.request()
            .input('name', sql.VarChar, name)
            .input('type', sql.Int, type)
            .input('start', sql.Date, new Date(start.substring(0, 4), start.substring(4, 6) - 1, start.substring(6, 8)))
            .input('end', sql.Date, new Date(end.substring(0, 4), end.substring(4, 6) - 1, end.substring(6, 8)))

        const result = await request.query(`select * from ${this.getTableName()} where id=@name and BankingIOType=@type and dateRequest>=@start and dateRequest<=@end`)

        return result.recordset
    }
}

module.exports = new tBankingIO