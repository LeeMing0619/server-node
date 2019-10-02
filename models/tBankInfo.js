const { sql, poolPromise } = require('../config/db');

class tBankInfo {
    constructor(id, name, value) {
        this.id = id
        this.name = name
        this.value = value
    }

    getTableName() {
      return this.constructor.name
    }

    async fetchAllList() {
        const pool = await poolPromise
        
        const request = pool.request()
        const result = await request.query(`select * from ${this.getTableName()}`)

        return result.recordset
    }
}

module.exports = new tBankInfo