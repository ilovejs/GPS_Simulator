## File composition
	
	loader.js is a lambda function
	
	loader_local.js is a test runner
	
	index.js is node local programe for data rendering and viewing
	
	data.js is a tool that parse gpx file
	
## Setup

	sls create --template aws-nodejs --path aws-nodejs-sls
	npm init
	npm install serverless --save-dev
	sls deploy
	
## Remove
	sls remove	
	
## Lambda Test

	> sls invoke local -f push_coords


## Trouble shooting

Manually create log group if any problem:
    - cloudwatchLog: '/aws/lambda/push_coords'

## Dynamo schema:
	createdAt   N primary key  
	updatedAt   N sort key as part of composite key
    oid         N 
    lat         N
    lon         N
    

## How to run after installation

	* production need cloudformation and bill
		> npm run prod
	
	* simulation is on local
		> npm run test 

## Discussion
	Attempted several frontend and backend tasks with some simulation, `infrustructure as code`.
	
	Side tasks like unit test and appsync, iot are not implemented.
	
	Pros to use lambda is that it seems simple in architecture. 
	Cons, costy and hard to trigger in less than 1mins frequency.
	
	Better solution is to use iot as stream, so rather than push and pull model as implemented here.
	Our method is quite like mini-batch, which makes client and lambda side wasted a bit system resources.
	
	What I learn is 
		mapbox gl api, dynamo schema design and api, socket.io, lambda, serverless deployment.
		
	What need to be aware of:
		battery consumption for browser.

	These should server as MVP, most of coding style is subject to change.
	
### Notes

[debug](https://hackernoon.com/running-and-debugging-aws-lambda-functions-locally-with-the-serverless-framework-and-vs-code-a254e2011010)
[invoke](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/)
https://mariusschulz.com/blog/typescript-2-3-downlevel-iteration-for-es3-es5
https://iamturns.com/typescript-babel/
[TO GeoJSON](https://mapbox.github.io/togeojson/)


## Don't forget to turn off cloud watch