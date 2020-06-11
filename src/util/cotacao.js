const request = require('request')
const api_token = 'eTdohN94uqB6sFa8KqpAMvGc2XycJ4GM0L3IywIJeGsvxCFeBBPOnBcFwbzI';

const activeStock = (symbol, callback) => {

    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`
    request({url: url, json: true}, (err, response) => { 

        if(err){
            callback({
                message: `Something went wrong: ${err}`,
                code: 500,
            }, undefined);
        }

        if(response.body === undefined || response.body.data === undefined){
            callback({
                message: 'No data found',
                code: 404
            }, undefined);
        }

        const parsedJson = response.body.data[0];    
        const {symbol,day_high,day_low,price_open,price} = parsedJson;

        callback(undefined, {symbol,day_high,day_low,price_open,price});

    })
}

module.exports = activeStock;