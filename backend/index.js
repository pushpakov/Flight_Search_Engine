const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const flightModel = require("./flightDataModel")
const app = express();
const cors = require("cors")
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://pushpak:${process.env.cluster_Password}@radoncluster.opqe2.mongodb.net/${process.env.cluster_Name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})
    .then(() => console.log("mongodb connected"))
    .catch(err => console.log(err))


app.post("/", async (req, res) => {
    try {
        const data = req.body
        let obj = {}

        let {
            flightName,
            originCity,
            originCityAbbr,
            destinationCity,
            destinationCityAbbr,
            departureDate,
            departTime,
            arrivalTime,
            code,
            price
        } = data;

        obj.flightName = flightName.trim().split(' ').filter(a => a).join(' ').toLowerCase();
        obj.originCity = originCity.trim().split(' ').filter(a => a).join(' ').toLowerCase();
        obj.originCityAbbr = originCityAbbr.trim().split(' ').filter(a => a).join('').toUpperCase();
        obj.destinationCity = destinationCity.trim().split(' ').filter(a => a).join(' ').toLowerCase();
        obj.destinationCityAbbr = destinationCityAbbr.trim().split(' ').filter(a => a).join('').toUpperCase();
        obj.code = code.trim().split(' ').filter(a => a).join('').toUpperCase();
        obj.departureDate = departureDate.trim().split(' ').filter(a => a).join('');
        obj.departTime = departTime.trim().split(' ').filter(a => a).join('');
        obj.arrivalTime = arrivalTime.trim().split(' ').filter(a => a).join('');
        obj.price = price;

        let create = await flightModel.create(obj)
        return res.status(201).send({ status: true, data: create });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
})


app.get("/", async (req, res) => {
    try {
        const filter = req.query;
        let obj = {};

        let {
            originCity,
            destinationCity,
            departureDate,
            returnDate
        } = filter;

        obj.originCity = originCity.trim().split(' ').filter(a => a).join(' ').toLowerCase();
        obj.destinationCity = destinationCity.trim().split(' ').filter(a => a).join(' ').toLowerCase();
        obj.departureDate = departureDate.trim().split(' ').filter(a => a).join('');

        const oneWayData = await flightModel.find({ originCity: obj.originCity, destinationCity: obj.destinationCity, departureDate: obj.departureDate })
        let returnData;
        if (returnDate) {
            obj.returnDate = returnDate.trim().split(' ').filter(a => a).join('');
            returnData = await flightModel.find({ originCity: obj.destinationCity, destinationCity: obj.originCity, departureDate: obj.returnDate })
            return res.status(200).send({ message: "Results matching your query", success: true, code: 200, result: [ oneWayData, returnData ] });
        }else{
            return res.status(200).send({ message: "Results matching your query", success: true, code: 200, result: oneWayData });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

});

let port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running on ${port}`)
});

