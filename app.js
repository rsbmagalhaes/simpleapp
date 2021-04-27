const express = require('express');
const log4js = require('log4js');
const app = express();
const logger = log4js.getLogger('simple-app');
logger.level = "debug";
logger.info("Starting");

app.use(require('./auth-middleware'));

app.use("/", express.static('./public'));

app.use("/api/userinfo", (req, res, next)=> {
    if (!req.authenticated){
        return res.status(401).send("Unauthorized");
    } else {
        return res.json({
            a: req.accessTokenPayload,
            i: req.idTokenPayload
        });
    }
});

app.listen(3000, ()=>{
    logger.info("Listening at http://localhost:3000");
});