pipeline {
    agent any

    stages {
    stage('Run npm commands in Docker') {
        steps {
            script {
                // Create the init.sh file dynamically
                writeFile file: 'init.sh', text: '''
                #!/bin/bash

                # Navigate to the app directory
                cd /app

                # Install npm dependencies
                npm install

                # Run the build
                npm run build

                # Run the lint
                npm run lint
                '''

                // Make init.sh executable
                sh 'chmod +x init.sh'

                // Run the init.sh script in a Node.js Docker container
                sh 'docker run --rm -v $(pwd):/app -w /app node:alpine /bin/sh -c "./init.sh"'
            }
        }
    }
    // stages {
    //     stage('Build') {
    //         steps {
    //             script {
    //                 dir('client') {
    //                     sh 'ls'
    //                     sh 'docker run --rm -v $(pwd):/app -w /app node:alpine npm install'
    //                     sh 'npm install'
    //                     sh 'npm run build'
    //                 }
    //             }
    //         }
    //     }

    //     stage('Lint') {
    //         steps {
    //             script {
    //                 dir('client') {
    //                     try {
    //                         sh 'npm run lint'
    //                     } catch (Exception e) {
    //                         error("Linting failed. Please fix the linting errors before merging.")
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    triggers {
        githubPush()
    }

    post {
        success {
            githubNotify context: 'Lint', status: 'SUCCESS'
        }
        failure {
            githubNotify context: 'Lint', status: 'FAILURE'
        }
    }
}