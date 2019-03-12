## Commands
sls create --template aws-nodejs --path aws-nodejs-sls
npm init
npm install serverless --save-dev

[debug](https://hackernoon.com/running-and-debugging-aws-lambda-functions-locally-with-the-serverless-framework-and-vs-code-a254e2011010)
https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/
https://mariusschulz.com/blog/typescript-2-3-downlevel-iteration-for-es3-es5

## Babel
npm install --save-dev @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread

https://iamturns.com/typescript-babel/

## Test
sls invoke local -f push_coords


## Deployment
manually create log group
    - cloudwatchLog: '/aws/lambda/push_coords'


