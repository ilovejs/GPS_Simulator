const gpxParse = require("gpx-parse");

//process.env.PRJ_PATH

function fetch_coords(){
    let read_promise = new Promise(function(resolve, reject) {
        let file = '/Users/mike/Code/FE/aws-nodejs-sls/cords.gpx';
        let coords = [];

        gpxParse.parseGpxFromFile(file, function (error, data) {
            console.log('length: ' + data.tracks[0].segments[0].length);
            coords = data.tracks[0].segments[0];
            resolve(coords)
        });
    });

    return new Promise((resolve, error) => {
        read_promise.then(coords => {
            let arr = [];
            let minute = new Date().getMinutes();
            console.log(`minute: ${minute}`);

            let block_size = Math.floor(coords.length / 60);
            let fetchFrom = minute * block_size;
            console.log(`Range ${fetchFrom} - ${fetchFrom + block_size - 1}`);

            // Total 3809 / 60 min = 63.48 = 63 coordinates per minute
            // For each minute we take index from 0-63, 64-127, 128
            for (let i = 0; i < coords.length; i++) {
                if (i >= fetchFrom && i < fetchFrom + block_size) {
                    arr.push({
                        lat: coords[i].lat,
                        lon: coords[i].lon
                    });
                }
            }
            console.log(`arr.length: ${arr.length}`);
            resolve(arr);
        });

    });
}

exports.fetch_coords = fetch_coords;
