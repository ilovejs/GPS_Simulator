const uuid = require('uuid');

let AWS = require('aws-sdk');
const run = require('./run.js');
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
            PutRequest: {
                Item: {
                    id: uuid.v1(),
                    lon: arrayCoords[i].lon,
                    lat: arrayCoords[i].lat,
                    checked: false,
                    createdAt: timestamp,
                    updatedAt: timestamp
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

//module.exports.
f = async () => {
    const coords = await run.fetch_coords();
    console.log(coords.length); //63

    let chunk = 25;
    for (let i = 0, j = coords.length; i < j; i += chunk) {
        let ta = coords.slice(i, i + chunk);

        batchWriteCoords(ta, 'gps_coords');

    }
};

f();
