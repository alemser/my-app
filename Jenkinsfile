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
        node {
            stage("Deploy") {
                steps {
                    sh "export AWS_DEFAULT_REGION=eu-west-1"
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'aws-key', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        AWS("aws s3 sync build/ s3://my-app.alemser.link")
                    }
                }
            }
        }
    }
}
