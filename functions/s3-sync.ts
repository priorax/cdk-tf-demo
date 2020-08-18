import {StorageBucket} from '../.gen/providers/google';
import {Construct} from 'constructs';
import {S3Bucket} from '../.gen/providers/aws/s3-bucket'
import {S3BucketNotification} from '../.gen/providers/aws/s3-bucket-notification'
import {LambdaFunction} from '../.gen/providers/aws/lambda-function'
import {IamRole} from '../.gen/providers/aws/iam-role'
import {LambdaPermission} from '../.gen/providers/aws/lambda-permission'

import * as path from 'path';
export class BackupFunction {
    constructor(scope: Construct, gcp: StorageBucket, s3: S3Bucket){
        const role = new IamRole(scope, "lambdaAccess", {
            assumeRolePolicy: JSON.stringify(lambdaAssumeRole),
            name: 'cdk-tf-demo-role'
        })
        const handler = path.join(__dirname, '../code/lambda.zip')
        const lambda = new LambdaFunction(scope, "backupFunction", {
            functionName: 'backupFunction',
            handler: 'main.handler',
            runtime: 'python3.8',
            role: role.arn,
            filename: handler,
            environment: [
                {
                    variables: {
                        'GCP_BUCKET': gcp.name
                    }
                }
            ]
        })
        new S3BucketNotification(scope, 'S3Trigger', {
            bucket: s3.bucket as string,
            lambdaFunction: [{
                events:  ["s3:ObjectCreated:*"],
                lambdaFunctionArn: lambda.arn
            }]
        })
        new LambdaPermission(scope, 'lambdaPermission', {
            action: 'lambda:InvokeFunction',
            functionName: lambda.functionName,
            principal: 's3.amazonaws.com',
            sourceArn: s3.arn
        })
    }
}

const lambdaAssumeRole = {
    "Version": "2012-10-17",
    "Statement": [{ "Effect": "Allow", "Principal": {"Service": ["lambda.amazonaws.com"]}, "Action": ["sts:AssumeRole"] }]
  }