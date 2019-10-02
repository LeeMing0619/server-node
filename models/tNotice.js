const { sql, poolPromise } = require('../config/db');

class tNotice {
    constructor(id, time, idSend, title, body, league, mustRead) {
        this.id = id
        this.time = time
        this.idSend = idSend
        this.title = title
        this.body = body
        this.league = league
        this.mustRead = mustRead
    }

    getTableName() {
        return this.constructor.name
    }

    async fetchAllList() {
        const pool = await poolPromise

        const request = pool.request()
        const result = await request.query(`select * from ${this.getTableName()} order by mustRead desc, time desc`)

        return result.recordset
    }
}

module.exports = new tNotice