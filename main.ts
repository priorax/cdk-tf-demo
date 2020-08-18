import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import {RegisterAWSProvider, RegisterGoogleProvider} from './providers'
import {AWSBucket, GoogleBucket} from './storage';
import {BackupFunction} from './functions/s3-sync'
// import {RegisterState} from './state'
class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    // RegisterState(this)
    RegisterAWSProvider(this)
    RegisterGoogleProvider(this)
    const s3 = new AWSBucket(this)
    const gcs = new GoogleBucket(this)
    new BackupFunction(this, gcs.bucket, s3.bucket)
  }
}

const app = new App();
new MyStack(app, 'terraform-demo');
app.synth();