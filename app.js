const express = require("express"),
    fs = require("fs"),
    bodyParser = require("body-parser"),
    { serialiseReq } = require("./helper");

const app = express();

/**
 * Configure body parser
 */
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

/**
 * CORS middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const allowCrossDomain = function (req, res, next) {
    const allowOrigin = req.headers.origin || "*";
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Authentication, x-access-token"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    if (req.method === "OPTIONS") {
        res.status(200).send();
    } else {
        next();
    }
};

app.use(allowCrossDomain);

/**
 * Create Log folder if not exists change
 * depends upon ENV LOGFOLDER and FILENAME
 */
const logFolder = process.env.LOGFOLDER;
const filename = process.env.FILENAME;

if (!logFolder && !filename) {
    throw new Error("Please provide logFolder and filename via ENV")
}

if (!fs.existsSync(logFolder)) {
    try {
        fs.mkdirSync(logFolder);
    } catch (e) {
        throw new Error(
            `Error creating log folder ${logFolder} ,Please create manually- ${JSON.stringify(
                e
            )}`
        );
    }
}

/**
* Create server log stream.
**/
const serverLogStream = fs.createWriteStream(`${logFolder}/${filename}`, { flags: 'a' });

app.use((req, res, next) => {
    const start = Date.now();
    const { remoteAddress, remotePort, date,
        method, url, httpVersion, userAgent
    } = serialiseReq(req);
    res.on("finish",() => {
        serverLogStream.write(`${remoteAddress} - ${remotePort} [${date}] "${method} - ${url} HTTP/:${httpVersion}" ${userAgent} ${Date.now()-start} ms\n`);
    });

    next();
})
/**
 * app routes
 */
app.get("/", (req, res) => {
    
        res.status(200).json({
            responseCode: 0,
            responseDesc: "success",
            data: "Server Running on 4003"
        })
})
/**
 * Server setup
 */
const port = process.env.PORT || 4003;
const server = app.listen(port, "0.0.0.0", function () {
    console.log("Server running on port:" + port);
    console.log(`Please visit http://localhost:${port} for populating server logs`);
});