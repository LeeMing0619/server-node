const { sql, poolPromise } = require('../config/db');

class tJongmok {
    constructor(id, codeName, engName, korName, codeIdx, categoryIdx, scode, bundle) {
        this.id = id
        this.codeName = codeName
        this.engName = engName
        this.korName = korName
        this.codeIdx = codeIdx
        this.categoryIdx = categoryIdx
        this.scode = scode
        this.bundle = bundle
    }

    getTableName() {
        return this.constructor.name
    }

    async fetchListByBundle(bundle) {
        const pool = await poolPromise

        const request = pool.request()
          .input('bundle', sql.VarChar, bundle)
        const result = await request.query(`select * from ${this.getTableName()} where bundle=@bundle`)

        return result.recordset
    }
}

module.exports = new tJongmok