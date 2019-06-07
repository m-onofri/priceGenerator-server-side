const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PriceListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    prices: {
        type: Object,
        required: true
    }
});

module.exports = PriceList = mongoose.model('priceList', PriceListSchema);