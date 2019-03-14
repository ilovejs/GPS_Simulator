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

// initial location of fake data
let past_loc = {
    lng: 38.85169,
    lat: -77.08554
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

async function pull_from_dynamo(){
    /** Cloud watch trigger lambda coordinate generation.
     * Here we pull the past minute records.
     * */
    const two_minute = 60000 * 2;
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

    await docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");

            data.Items.forEach(function(item) {
                // console.log(item)
                let d = new Date(item.createdAt);

                // (38.85169,-77.08554)
                // Signal Socket IO
                io.emit('coords', {lat: item.lon, lng: item.lat}); //swap coordinates, since original gpx format.

                console.log(item.createdAt + ' - ' + d.getMinutes() +'m'+d.getSeconds() + " - " + item.oid + ": (" + item.lat + "," + item.lon + ")");
            });
        }
    });
}


TEST = false;

sec_unit = 1000;
if (process.argv.length > 2) {
    if (process.argv[2] == '--test') {
        TEST = true;
    }
}

loop_ms = TEST === true ? sec_unit * 2 : sec_unit * 20;
console.log(loop_ms);


// event loop
setInterval(() => {
    console.log('loop every ' + loop_ms + 'ms');

    if (TEST === true){
        // simulation
        io.emit('coords', genTracks());
    } else {
        // real
        pull_from_dynamo();
    }
}, loop_ms);


// app server
server.listen(port, () => {
    console.log('Server listening at port %d', port);
});


app.use(express.static(path.join(__dirname, 'public')));
