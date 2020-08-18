import {Construct} from "constructs"
import {AwsProvider} from '../.gen/providers/aws/aws-provider'

export const RegisterAWSProvider = (scope: Construct) => {
    new AwsProvider(scope, 'AWS', {
        region: 'ap-southeast-2'
    })
}