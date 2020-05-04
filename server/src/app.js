const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('express')

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

function getTotal(data) {
    let total = 0;
     for (let i in data) {
        for (let j in data[i]) {
            let month = data[i][j]
            if (month.deposited != null) {
                total += (+month.deposited - (+month.cost + +month.ku))
            }
        }
    }
    return total.toString();
}

function getCurrentYear(data) {
    return Object.keys(data)[Object.keys(data).length - 1];
}
function getAllYears(data) {
    return Object.keys(data);
}

let calendar = {};
calendar.full = JSON.parse(fs.readFileSync('./calendar.json'))
calendar.current = getCurrentYear(calendar.full)
calendar.years = getAllYears(calendar.full)
calendar.total = getTotal(calendar.full);

app.get('/calendar', (req, res) => {
    res.send(calendar)
})

app.post('/saveCalendar', (req, res) => {
    let md = req.body.monthData
    for (let i in md) {
        md[i] = parseInt(md[i])
    }
    console.log(req.body)
    let postCalendar = calendar.full[req.body.year][req.body.monthIndex];
    postCalendar.cost = md.cost;
    postCalendar.ku = md.ku;
    md.deposited == 0 ? postCalendar.deposited = null : postCalendar.deposited = md.deposited;
    postCalendar.electric = md.electric;
    postCalendar.water = md.water;

    console.log(calendar.full[req.body.year][req.body.monthIndex])
    fs.writeFileSync('./calendar.json', JSON.stringify(calendar.full))
    res.send('Данные успешно сохранены')
})

app.listen(process.env.PORT || 3555, () => {
    console.log('Server was started')
})