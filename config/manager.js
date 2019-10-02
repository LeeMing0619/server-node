class ConnectionManager {
    constructor () {
        this.connections = new Array();
    }

    getConnections() {
        return this.connections;
    }

    getConnectionByRemoteAddress(address) {
        for (const c of this.connections) {
            if (c._session.connection.remoteAddress == address) {
                return c;
            }
        }

        return null
    }

    removeConnection(conn) {
        this.connections = this.connections.filter(c => conn != c)
    }

    pushConnection(conn) {
        this.connections.push(conn)
    }
}

var SocketManager = (function() {
    var instance;
    
    function createInstance() {
        var manager = new ConnectionManager();
        return manager;
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    }
})();

module.exports=SocketManager.getInstance()