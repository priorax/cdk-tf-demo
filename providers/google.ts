import {GoogleProvider} from '../.gen/providers/google';
import { Construct } from 'constructs';
import * as fs from 'fs'
import * as path from 'path'

export const RegisterGoogleProvider = (scope: Construct) => new GoogleProvider(scope, 'Google', {
    region: "us-central1",
    zone: "us-central1-c",
    project: 'api-project-451898141794',
    credentials: fs.readFileSync(path.join(process.env.HOME as string, '.config/gcloud/application_default_credentials.json')).toString()
    })