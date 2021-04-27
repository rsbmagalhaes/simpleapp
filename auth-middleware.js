const log4js = require('log4js');
const logger = log4js.getLogger('auth-middleware');
logger.level = "debug";
const base64url = require('base64url');

module.exports = (req, res, next)=> {
    logger.info(">>>", req.method, req.originalUrl);
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        logger.info("Authorization header not found.")
        req.authenticated=false;
        req.accessToken=null;
        req.idToken=null;
        return next();
    }
    logger.info("Authorization header", authHeader);
    var headerComponents = authHeader.split(" ");

    req.authenticated=true;
    var accessTokenRaw = headerComponents[1];
    var accessTokenComponents = accessTokenRaw.split(".");
    var accessTokenPayloadRaw = accessTokenComponents[1];
    try {
        var accessTokenJson = base64url.decode(accessTokenPayloadRaw);
        req.accessTokenPayload = JSON.parse(accessTokenJson);
    } catch (err) {
        req. accessTokenPayload = accessTokenRaw;
    }

    if (headerComponents.length>2){
        var idTokenRaw = headerComponents[2];
        var idTokenComponents = idTokenRaw.split(".");
        var idTokenPayloadRaw = idTokenComponents[1];
        var idTokenJson = base64url.decode(idTokenPayloadRaw);
        req.idTokenPayload = JSON.parse(idTokenJson);
    }
    
    next();

}