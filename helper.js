module.exports = {
    serialiseReq(req){
        return {
            method: req.method,
            url: req.url,
            headers: req.headers,
            remoteAddress: req.connection.remoteAddress,
            remotePort:req.connection.remotePort,
            date:new Date().toISOString(),
            httpVersion:req.httpVersion,
            userAgent: req.get('User-Agent')
        }
    }
}