const { sql, poolPromise } = require('../config/db');

class tClientConnect {
  constructor(id, ip, macAddr, type, league) {

  }

  getTableName() {
    return this.constructor.name
  }

  async fetchConnectInfoById(id) {
    const pool = await poolPromise

    
    const request = pool.request()
        .input("id", sql.VarChar, id)
    const result = await request.query(`select TOP 1 * from ${this.getTableName()} where id=@id order by time desc`)
    return result.recordset
  }
}

module.exports = new tClientConnect