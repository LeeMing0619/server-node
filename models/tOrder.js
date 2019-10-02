const { sql, poolPromise } = require('../config/db');

class tOrder {
    constructor(id, code, MerchandiseTypeID, MarketTypeID, ordNum, date, time, PositionTypeID, OrderTypeID, HogaTypeID, volOrder, volContract, priceOrder, priceContract, profit, fee, ordNumOrg, ActorTypeID, orderLevel, isRealContract, ClientLevelTypeID, RealOrdNum, league) {
        this.id = id
        this.code = code
        this.MerchandiseTypeID = MerchandiseTypeID
        this.MarketTypeID = MarketTypeID
        this.ordNum = ordNum
        this.date = date
        this.time = time
        this.PositionTypeID = PositionTypeID
        this.OrderTypeID = OrderTypeID
        this.HogaTypeID = HogaTypeID
        this.volOrder = volOrder
        this.volContract = volContract
        this.priceOrder = priceOrder
        this.priceContract = priceContract
        this.profit = profit
        this.fee = fee
        this.ordNumOrg = ordNumOrg
        this.ActorTypeID = ActorTypeID
        this.orderLevel = orderLevel
        this.isRealContract = isRealContract
        this.ClientLevelTypeID = ClientLevelTypeID
        this.RealOrdNum = RealOrdNum
        this.league = league
    }

    getTableName() {
        return this.constructor.name
    }

    async fetchUserTradeHistoryList(id, bdate, edate, MerchandiseTypeID, MarketTypeID) {
        const pool = await poolPromise

        const request = pool.request()
        .input('id', sql.VarChar, id)
        .input('bdate', sql.Date, new Date(bdate.substring(0, 4), bdate.substring(4, 6) - 1, bdate.substring(6, 8)))
        .input('edate', sql.Date, new Date(edate.substring(0, 4), edate.substring(4, 6) - 1, edate.substring(6, 8)))
        .input('MerchandiseTypeID', sql.Int, MerchandiseTypeID)
        .input('MarketTypeID', sql.Int, MarketTypeID)
        const result = await request.query(`select * from ${this.getTableName()} where id = @id and date >= @bdate and date <= @edate and MerchandiseTypeID = @MerchandiseTypeID and MarketTypeID = @MarketTypeID`)
        return result.recordset        
    }

    async fetchTotOverseaProfitList(id, bdate, edate) {
        const pool = await poolPromise

        const request = pool.request()
        .input('id', sql.VarChar, id)
        .input('bdate', sql.Date, new Date(bdate.substring(0, 4), bdate.substring(4, 6) - 1, bdate.substring(6, 8)))
        .input('edate', sql.Date, new Date(edate.substring(0, 4), edate.substring(4, 6) - 1, edate.substring(6, 8)))
        const result = await request.query(`select * from ${this.getTableName()} where id = @id and date >= @bdate and date <= @edate`)

        return result.recordset
    }

    async fetchOverseaProfitList(id, bdate, edate) {
        const pool = await poolPromise

        const request = pool.request()
        .input('id', sql.VarChar, id)
        .input('type', sql.Int, 2)
        .input('bdate', sql.Date, new Date(bdate.substring(0, 4), bdate.substring(4, 6) - 1, bdate.substring(6, 8)))
        .input('edate', sql.Date, new Date(edate.substring(0, 4), edate.substring(4, 6) - 1, edate.substring(6, 8)))
        const result = await request.query(`select sum(profit) as sum_profit, sum(fee) as sum_fee from ${this.getTableName()} where id = @id and date >= @bdate and date <= @edate and MerchandiseTypeID=@type`)

        return result.recordset
    }

    async fetchFutureProfitList(id, bdate, edate) {
        const pool = await poolPromise

        const request = pool.request()
        .input('id', sql.VarChar, id)
        .input('type', sql.Int, 0)
        .input('bdate', sql.Date, new Date(bdate.substring(0, 4), bdate.substring(4, 6) - 1, bdate.substring(6, 8)))
        .input('edate', sql.Date, new Date(edate.substring(0, 4), edate.substring(4, 6) - 1, edate.substring(6, 8)))
        const result = await request.query(`select sum(profit) as sum_profit, sum(fee) as sum_fee from ${this.getTableName()} where id = @id and date >= @bdate and date <= @edate and MerchandiseTypeID=@type`)

        return result.recordset
    }

    async fetchOptionProfitList(id, bdate, edate) {
        const pool = await poolPromise

        const request = pool.request()
        .input('id', sql.VarChar, id)
        .input('type', sql.Int, 1)
        .input('bdate', sql.Date, new Date(bdate.substring(0, 4), bdate.substring(4, 6) - 1, bdate.substring(6, 8)))
        .input('edate', sql.Date, new Date(edate.substring(0, 4), edate.substring(4, 6) - 1, edate.substring(6, 8)))
        const result = await request.query(`select sum(profit) as sum_profit, sum(fee) as sum_fee from ${this.getTableName()} where id = @id and date >= @bdate and date <= @edate and MerchandiseTypeID=@type`)

        return result.recordset
    }
}

module.exports = new tOrder