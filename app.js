const createError = require("http-errors")
const express = require("express")
const path = require("path")
const logger = require("morgan")
const cors = require("cors")

const indexRouter = require("./routes/index")

const app = express()

// CORS
const corsOptions = {
    origin: "http://example.com", // Replace with your specific URL
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.send(err.status || 500)
})

module.exports = app
