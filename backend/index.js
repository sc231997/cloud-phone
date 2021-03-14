require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors')

const plivo = require('plivo');
const client = new plivo.Client()

const pool = require('./db')

// middleware
app.use(express.json());
app.use(cors());

app.all('/answer', (req, res) => {
    var r = plivo.Response()
    r.addDial({
        timeLimit: parseInt(req.query.timelimit)
    }).addNumber(req.query.from)
    res.send(r.toXML())
})

app.post('/call', (req, res) => {
    var body = req.body

    client.calls.create(
        body.from,
        body.to,
        `${process.env.CALL_BACK_BASE_URL}/answer?from=${body.from}&timelimit=${body.timelimit}`
    ).then((result) => {
        console.log(result)
        pool.query(
            "INSERT INTO PhoneLog (PhoneLogId,Name,\"From\",\"To\",timelimit) VALUES ($1,$2,$3,$4,$5)",
            [result.requestUuid, body.name, body.from, body.to, body.timelimit]
        ).then((res) => {
            console.log("Database Updated PhoneLog")
            console.log(res)
        }).catch((err) => {
            console.error(err);
        })
        res.send(result)
    }).catch((err) => {
        console.error(err)
        res.sendStatus(400)
    })
})

app.post('/hangup', (req, res) => {
    var body = req.body
    client.calls.hangup(
        body.requestUuid
    ).then((result) => {
        console.log(result)
        res.send(result)
    }).catch((err) => {
        console.error(err)
        res.sendStatus(400)
    })

})

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});