const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({

    flightName: {
        type: String,
        required: true
    },
    originCity: {
        type: String,
        required: true
    },
    originCityAbbr: {
        type: String,
        required: true
    },
    destinationCity: {
        type: String,
        required: true
    },
    destinationCityAbbr: {
        type: String,
        required: true
    },
    departureDate: {
        type: String, //format("YYYY-MM-DD")
        default: Date,
        required: true,
    },
    departTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);