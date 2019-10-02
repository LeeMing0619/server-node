const utils = require('../middleware/utils')
const model = require('../models/tNotice')
const connectionManager = require('../config/manager');

const sendData = async (conn, data) => {
  conn.write(data)
}

const postUserInfo = async (body, id) => {
  for (let c of connectionManager.getConnections()) {
    if (c.username == id) {
      const url = "/topic/pnl/" + id
      c.messageCount++;
      const prefix = "MESSAGE\ndestination:" + url + "\ncontent-type:text/plain;charset=UTF-8\nsubscription:" + c.subForName + "\nmessage-id:" + c.messageId + "-" + c.messageCount + "\n"
      //const prefix = "MESSAGE\ndestination:" + url + "\ncontent-type:text/plain;charset=UTF-8\nsubscription:" + c.subForName + "\n"
      let data = prefix + "content-length:" + body.length + "\n\n" + body + "\u0000"
      /*
      console.log("receiver : " + id)
      console.log("data : " + data)
      */
      sendData(c, data)
    }
  }
}

const postData = async (body, category, id) => {
  for (let c of connectionManager.getConnections()) {
    const url = "/topic/" + category + "/" + id
    if (c.destination == url) {
      c.messageCount++;
      const prefix = "MESSAGE\ndestination:" + url + "\ncontent-type:text/plain;charset=UTF-8\nsubscription:" + c.sub + "\nmessage-id:" + c.messageId + "-" + c.messageCount + "\n"
      //const prefix = "MESSAGE\ndestination:" + url + "\ncontent-type:text/plain;charset=UTF-8\nsubscription:" + c.sub + "\n"
      let data = prefix + "content-length:" + body.length + "\n\n" + body + "\u0000"
      //c.write(data)
      sendData(c, data)
    }
  }
}

exports.postFuture = async (req, res) => {
  try {
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function (chunk) {
      req.rawBody += chunk;
    });
    req.on('end', function () {
      postData(req.rawBody, req.params.category, req.params.id)
      res.status(200).json({ success: true })
    });
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.postUserState = async (req, res) => {
  try {
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function (chunk) {
      req.rawBody += chunk;
    });
    req.on('end', function () {
      postUserInfo(req.rawBody, req.params.id)
      res.status(200).json({ success: true })
    });
  } catch (error) {
    utils.handleError(res, error)
  }
}