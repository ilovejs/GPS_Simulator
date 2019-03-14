## File composition
	loader.js is a lambda function
	loader_local.js is a test runner
	index.js is node local programe for data rendering and viewing
## Setup

	sls create --template aws-nodejs --path aws-nodejs-sls
	npm init
	npm install serverless --save-dev
	sls deploy
	
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

### Notes

[debug](https://hackernoon.com/running-and-debugging-aws-lambda-functions-locally-with-the-serverless-framework-and-vs-code-a254e2011010)
https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/
https://mariusschulz.com/blog/typescript-2-3-downlevel-iteration-for-es3-es5
https://iamturns.com/typescript-babel/
	