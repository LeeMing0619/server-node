const { sql, poolPromise } = require('../config/db');

class tEnvironment {
    constructor(name, value, league) {
        this.name = name
        this.value = value
        this.league = league
    }

    getTableName() {
        return this.constructor.name
    }

    async getDepositesByName(name1, name2) {
        const pool = await poolPromise

        const request = pool.request()
        .input('name1', sql.VarChar, name1)
        .input('name2', sql.VarChar, name2)
        const result = await request.query(`select * from ${this.getTableName()} where name=@name1 or name=@name2`)

        return result.recordset
    }

    async getAllDeposits() {
        const pool = await poolPromise

        const request = pool.request()
        const result = await request.query(`select * from ${this.getTableName()}`)

        return result.recordset
    }
}

module.exports = new tEnvironment