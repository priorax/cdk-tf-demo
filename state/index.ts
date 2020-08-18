import {Construct} from 'constructs';
import {S3Backend} from 'cdktf';

export function RegisterState(scope: Construct) {
    new S3Backend(scope, {
        bucket: "dferris-cdk-tf-demo",
        key: "tfstate.tf.json",
        region: "ap-southeast-2"
      });
}