const { sql, poolPromise } = require('../config/db');

class tClient {
    constructor(
        id, 
        name, 
        password, 
        email, 
        mobile, 
        bank, 
        bankAccount, 
        bankOwner, 
        feeFutures, 
        feeOptions, 
        feeNightFutures, 
        feeNightOptions, 
        feeForeignFutures, 
        feeForeignFutures2, 
        ClientLevelTypeID, 
        AccountStateTypeID, 
        recommender, 
        registerDate, 
        bankBalance, 
        todayProfitRealized, 
        futuresMaxContract, 
        optionsBuyMaxContract, 
        optionsSellMaxContract, 
        foreignFuturesMaxContract, 
        enableOvernight, 
        maxDepositFrom0, 
        is_login, 
        login_fail, 
        futuresOrderLevel, 
        optionsOrderLevel, 
        foreignFuturesOrderLevel, 
        nightFuturesOrderLevel, 
        nightOptionsOrderLevel, 
        league) {
    }

    getTableName() {
        return this.constructor.name
    }

    async getRequestAmount(id) {
        const pool = await poolPromise

        const request = pool.request()
        .input('id', sql.VarChar, id)
        const result = await request.query(`select sum(request) as amount from ${this.getTableName()} where id=@id`)

        return result.recordset
    }

    async getItemsByName(id) {
        const pool = await poolPromise

        const request = pool.request()
        .input('id', sql.VarChar, id)
        const result = await request.query(`select * from ${this.getTableName()} where id=@id`)

        return result.recordset
    }

    async registerNewMember(id, password, name, mobile, recommender, bank, bankAccount, bankOwner, email) {
        const pool = await poolPromise

        const request = pool.request()
        .input('id', sql.VarChar, id)
        .input('password', sql.VarChar, password)
        .input('name', sql.VarChar, name)
        .input('mobile', sql.VarChar, mobile)
        .input('recommender', sql.VarChar, recommender)
        .input('bank', sql.VarChar, bank)
        .input('bankAccount', sql.VarChar, bankAccount)
        .input('bankOwner', sql.VarChar, bankOwner)
        .input('email', sql.VarChar, email)

        const exists = await request.query(`select * from ${this.getTableName} where id = @id or name = @name`)
        if (exists.recordset.length > 0) {
            return false;
        }

        await request.query(`insert into ${this.getTableName()} ('id', 'name', 'password', 'email', 'mobile', 'bank', 'bankAccount', 'bankOwner', 'feeFutures', 'feeOptions', 'feeNightFutures', 'feeNightOptions', 'feeForeignFutures', 'feeForeignFutures2', 'ClientLevelTypeID', 'AccountStateTypeID', 'recommender', 'bankBalance', 'todayProfitRealized', 'futuresMaxContract', 'optionsBuyMaxContract', 'optionsSellMaxContract', 'foreignFuturesMaxContract',  'enableOvernight', 'maxDepositFrom0', 'is_login', 'login_fail', 'futuresOrderLevel', 'optionsOrderLevel', 'foreignFuturesOrderLevel', 'nightFuturesOrderLevel', 'nightOptionsOrderLevel', 'league') values (id, name, password, email, mobile, bank, bankAccount, bankOwner, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0, 0, recommender, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'ALPHA')`)
        return true
    }
}

module.exports = new tClient