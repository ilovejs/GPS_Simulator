const express = require('express');
const app = express();
const path = require('path');

const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

let past_loc = {
    lat: 146,
    lng: -32
};

function genTracks(){
    let dice = Math.random();

    if (dice > 0.5){
        past_loc.lat = past_loc.lat + dice * 0.0004;
        return past_loc
    } else {
        past_loc.lng = past_loc.lng + dice * 0.0007;
        return past_loc
    }
}

function pull_from_dynamo(){
    const two_minute = 60000 * 2; //in ms
    const now_d = new Date().getTime();
    console.log(now_d);
    const two_minute_ts = now_d - two_minute;

    let params = {
        TableName : process.env.TableName || 'GPSDmoTable',
        // KeyConditionExpression: "updatedAt > :t",
        FilterExpression: "updatedAt > :t",
        ExpressionAttributeValues: {
            ":t": two_minute_ts
        }
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");

            data.Items.forEach(function(item) {
                // console.log(item)
                let d = new Date(item.createdAt);
                console.log(item.createdAt + ' - ' + d.getMinutes() +'m'+d.getSeconds() + " - " + item.oid + ": (" + item.lat + "," + item.lon + ")");
            });
        }
    });
}

pull_from_dynamo();

// setInterval(() => {
//     console.log('emitting');
//     io.emit('coords', genTracks());
// }, 2000);

// server.listen(port, () => {
//     console.log('Server listening at port %d', port);
// });
//
// app.use(express.static(path.join(__dirname, 'public')));
