import {StorageBucket} from '../.gen/providers/google';
import { Construct } from 'constructs';

export class GoogleBucket {
    bucket: StorageBucket
    constructor(scope: Construct) {
        this.bucket = new StorageBucket(scope, "GCPBucket", {
            name: "cdktf-backup-demo",
            location: 'australia-southeast1',
            storageClass: 'nearline'
        })
    }
}