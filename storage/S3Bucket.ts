import { Construct } from 'constructs';
import {S3Bucket} from '../.gen/providers/aws/s3-bucket'
export class AWSBucket {
    bucket: S3Bucket
    constructor(scope: Construct){
        this.bucket = new S3Bucket(scope, "S3Bucket")
    }
}