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
                sh "sudo apt install curl"
                sh "sudo apt install unzip"
                sh "curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip'"
                sh "unzip awscliv2.zip"
                sh "./aws/install"

                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "export AWS_DEFAULT_REGION=eu-west-1"
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                    credentialsId: 'deploy-s3'
                ]]) {
                    sh "aws s3 sync build/ s3://my-app.alemser.link"
                }
            }
        }
    }
}
