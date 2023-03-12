@Library('github.com/releaseworks/jenkinslib') _

pipeline {
     agent {
         docker {
             image 'node:lts-bullseye-slim'
             args '-p 3000:3000'
         }
     }
     stages {
        stage("Build") {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "export AWS_DEFAULT_REGION=eu-west-1"
                withCredentials([<object of type com.cloudbees.jenkins.plugins.awscredentials.AmazonWebServicesCredentialsBinding>]) {
                    sh "aws s3 sync build/ s3://my-app.alemser.link"
                }
            }
        }
    }
}
