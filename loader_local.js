'use strict';

/*
* Loading Data Into Cloud
* */


const uuid = require('uuid');
let AWS = require('aws-sdk');
const run = require('./data.js');

let docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});


function batchWriteCoords(arrayCoords, tableName) {
    /**
     * @param arrayCoords   length cap at 25
     * for example, [ { lat: 38.93739, lon: -77.04801 }, ... ]
     */
    let itemsArray = [];
    for (let i = 0; i < arrayCoords.length; i++) {
        const timestamp = new Date().getTime();
        let item = {
            //message: 'Provided list of item keys contains duplicates',
            PutRequest: {
                Item: {
                    oid: i,                         //order id numeric
                    lon: arrayCoords[i].lon,
                    lat: arrayCoords[i].lat,
                    createdAt: timestamp,
                    updatedAt: timestamp + i,       //ordered key need to have order...no constant
                }
            }
        };
        if (item) {
            itemsArray.push(item);
        }
    }
    let params = {
        RequestItems: {
            [tableName]: itemsArray
        }
    };

    docClient.batchWrite(params, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Added ' + itemsArray.length + ' items to DynamoDB');
        }
    });
}


// module.exports.push_coords = async (event, context) => {
let f = async () => {
    const coords = await run.fetch_coords();
    console.log(coords.length); //63

    let tableName = process.env.TableName || process.env.DYNAMODB_TABLE || 'GPSDmoTable';

    let chunk = 25;
    for (let i = 0, j = coords.length; i < j; i += chunk) {
        let ta = coords.slice(i, i + chunk);
        console.log('writing..');
        await batchWriteCoords(ta, tableName);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Push Coords Success!',
            length: coords.length
        }),
    };
};

f();
