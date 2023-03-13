@Library('github.com/releaseworks/jenkinslib') _

pipeline {
     agent {
         docker {
             image 'alemser/nodeplus'
             sh "cd /var/jenkins_home/workspace"
             sh "sudo chown -R jenkins folderName"
             sh "sudo setfacl -R -m user:jenkins:rwx folderName"

             args '-u root:root'
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
