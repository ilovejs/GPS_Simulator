Problem
Our clients have assets such as vehicles, cranes, excavators that they want to track in real time.

For your technical test we would like you to do a vehicle tracking simulator and plotter.

* Task
We would like you to demonstrate your full stack understanding (Front end, Node, AWS). The main three components of the application are:

    Vehicle Tracker Simulator: 
        Lambda function that is triggered via CloudWatch Scheduled Event that saves a GPS coordinate and other information you can chose into a DynamoDB table.
        
    Backend: 
        API Gateway/Lambda function that reads from the DynamoDB table and returns it to the frontend.
    
    Frontend: 
        An application that plots the movement in a map in real time and shows information about an asset in a user friendly way.

* Bonus features
    
    AWS features: 
        Use of AWS IoT, Cognito, AppSync, Amplify.
    
    Frontend features: 
        Have tracking history for an asset (trace).
    
    Problem solving skill: 
        Simulator should generate GPS coordinates that are realistic (not totally random like Hornsby in one minute and then Mortdale in the next).
        
    Unit testing

* Submission
    You can sign up for a free-tier AWS account.
    Use a Github repository for your code.
    Use a README file in the repo which details how to run your project and also how you approached it and what challenges you had along the way.
    Make sure that the code you submit meets the standards you would have for a code review
    It would be great if you can send your tech test back to me within 7 days.
    Feel free to contact me if you’ve any questions! Also it would be great if you can confirm that you got this email and that the task is clear :)
    
## Solution Design

    Main Task:
        [1] cloud-watch -> lambda save coords+ -> dynamo
        q: how to use IoT for better design ? which parts need to be taken ?
        
        [2] read dynamo and return to frontend
        
        [3] plot in realtime
    
    Skipped Task:
        Cognito
        AppSync

## Word Logs

- Manual prepare for valid coordinates:
    1. type name of location and add to route planner:
        [GPX](http://map.project-osrm.org/?z=12&center=38.863771%2C-76.976051&loc=38.956806%2C-77.064543&loc=38.882481%2C-77.174149&loc=38.846502%2C-77.089423&loc=38.774725%2C-77.135032&loc=38.848724%2C-76.923862&loc=38.956907%2C-77.064687&hl=en&alt=0)
    2. left down corner 'export to GPX'
    3. use sublime to quick format xml
    4. save to ./data folder
    
    Q: Assume speed < 150M/s, how much geo cords move in variation ? Can we control it ?
   
- Research IoT
    MQTT: 2yr ago
        https://github.com/awslabs/aws-weathergen
    IoT tutorial
        https://hub.packtpub.com/build-an-iot-application-with-aws-iot-tutorial/
    Google map os
        https://github.com/googlemaps/
        Google Map API format:
            https://cloud.google.com/maps-platform/routes/
            * Place API, (point of interest)
                https://developers.google.com/maps/documentation/geocoding/start
        
    Route Planning
        https://github.com/perliedman/leaflet-routing-machine

    Tomtom has geo fencing to block invalid boundary
        also, display and traffic api
        https://developer.tomtom.com/
        
    Hardware of IoT
        https://www.hackster.io/maleficarum/decentralized-fleet-tracking-with-blockchain-f61d6c
        - more detailed GPS hardware simulator (COM port)
            https://www.youtube.com/watch?v=69MdQDFkYL4
     
    More thorough solution design for industry
        Connected Vehicle Solution:
            https://aws.amazon.com/solutions/aws-connected-vehicle-solution/
            slides:  
                https://www.slideshare.net/AmazonWebServices/amf302alexa-wheres-my-car-a-test-drive-of-the-aws-connected-car-referencepdf
- Setup IoT [skipped for now]
    
    https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules-tutorial.html
    https://github.com/aws-samples/aws-iot-examples
    
- Create Lambda and SLS 
    > mkdir generator && cd generator
    
    Template
    https://github.com/serverless/examples/tree/master/aws-node-typescript-rest-api-with-dynamodb
    > sls create --template aws-nodejs-typescript
    
    > sls deploy
    
    gpsCoordsGenerator-dev dynamo table will be created
    
    GET - https://pa3kqv7ki6.execute-api.us-east-1.amazonaws.com/dev/hello
    POST - https://pa3kqv7ki6.execute-api.us-east-1.amazonaws.com/dev/gps

    curl -X GET https://pa3kqv7ki6.execute-api.us-east-1.amazonaws.com/dev/hello
    curl -X POST https://pa3kqv7ki6.execute-api.us-east-1.amazonaws.com/dev/gps --data '{ "text": "Learn Serverless" }'

- Simulate some data
    
- GraphQL [skipped]
    https://github.com/serverless/examples/blob/master/aws-node-graphql-api-with-dynamodb/handler.js

- Offline
    https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb-and-offline
    > export SLS_DEBUG=*
    
    [SlS Offline](https://github.com/dherault/serverless-offline)
    > npm install serverless-offline --save-dev
    > npm install serverless-dynamodb-local --save-dev
    
    [Dynamo Local](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb-and-offline)
    > sls dynamodb install
    > sls dynamodb start --migrate
    
    Fix bug if above have issue
    https://github.com/99xt/serverless-dynamodb-local/issues/210
    > sls dynamodb install --localPath ./bin
    
    Testing offline
    > sls offline
    > curl -X GET http://localhost:3000/hello
    > curl -X POST http://localhost:3000/gps --data '{ "text": "Learn Serverless" }'

- UI
    https://docs.mapbox.com/api/maps/
    https://developers.google.com/maps/solutions/transport-tracker/backend

- AWS Promise
    https://aws.amazon.com/blogs/compute/node-js-8-10-runtime-now-available-in-aws-lambda/

# debugging

> sls offline
 