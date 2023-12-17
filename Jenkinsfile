pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('docker-hub-elad')
    }

    stages {

        // stage('Checkout') {
        //     steps {
        //         script {
        //             echo 'Checking out code...'
        //             checkout scm
        //         }
        //     }   
        // }

        stage('Lint') {
            steps {
                script {
                    dir('client') {
                        echo 'Linting...'
                        //sh 'npm run lint'
                    }
                }
            }
        }

        stage('Unit Test') {
            steps {
                script {
                    dir('client') {
                        echo 'Installing dependencies...'
                        sh 'npm install'
                        echo 'Running unit tests...'
                        sh 'npm run test'
                    }
                }
            }
        }

        stage('Server Build') {
            steps {
                script {
                    dir('server') {
                        echo 'Building Server...'
                        sh 'docker build -t $ DOCKER_CREDENTIALS_USR/banners-server .'
                    }
                }
            }
        }

        stage('Client Build') {
            steps {
                script {
                    dir('client') {
                        echo 'Building Client...'
                        sh 'docker build -t $ DOCKER_CREDENTIALS_USR/banners-client .'
                    }
                }
            }
        }

        // stage('Client Build') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 echo 'Building...'
        //                 sh 'npm run build'
        //             }
        //         }
        //     }
        // }

        // stage('Integration Test') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 echo 'Installing dependencies...'
        //                 sh 'npm install'
        //                 echo 'Running integration tests...'
        //                 sh 'npm run test'
        //             }
        //         }
        //     }
        // }


        // stage('Build and Test') {
        //     steps {
        //         script {
        //             def initSqlContent = '''CREATE DATABASE db;            
        //                     CREATE TABLE IF NOT EXISTS users (
        //                     id SERIAL PRIMARY KEY,
        //                     email VARCHAR(255) NOT NULL,
        //                     password VARCHAR(255) NOT NULL,
        //                     isadmin BOOLEAN DEFAULT false,
        //                     resetcode VARCHAR(255),
        //                     registration_time TIMESTAMP
        //                 );'''

        //             sh 'echo $initSqlContent'
        //             writeFile file: 'scripts/init.sql', text: initSqlContent
                   
        //             sh 'ls -alF'

        //             def dockerfileContent = '''
        //                 FROM node:18-alpine AS builder
        //                 WORKDIR /app
        //                 COPY package*.json ./
        //                 RUN npm install
        //                 RUN npm install -D typescript
        //                 COPY . .
        //                 CMD ["npm", "test"]
        //             '''
        //             // Write Dockerfile content to a file
        //             writeFile file: 'Dockerfile.test', text: dockerfileContent

        //             // Create the network if it doesn't exist
        //             sh 'docker network ls | grep -q app-network || docker network create app-network'

        //             // Build the Docker image for Express.js server
        //             sh 'docker build -t oms-end-test3 -f Dockerfile.test .'
        //             sh 'docker build -t oms-end3 .'

        //             sh 'docker-compose up -d'               
        //         }
        //     }
        // }
    }
    post {
        always {
            cleanWs()
            // script {
            //     sh 'docker stop mongo-db'
            //     sh 'docker rm mongo-db'

            //     sh 'docker stop my-postgres'
            //     sh 'docker rm my-postgres'

            //     sh 'docker-compose down -v'
            // }
        }
    }
}