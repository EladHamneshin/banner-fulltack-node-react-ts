pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('docker-hub-elad')
    }

    stages {
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

        stage('Install Dependencies') {
            steps {
                script {
                    dir('client') {
                        echo 'Installing dependencies...'
                        sh 'npm cache clean --force'
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Unit Test') {
            steps {
                script {
                    dir('client') {
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
                        sh 'docker build -t $DOCKER_CREDENTIALS_USR/banners-server .'
                    }
                }
            }
        }

        stage('Client Build') {
            steps {
                script {
                    dir('client') {
                        echo 'Building Client...'
                        sh 'docker build -t $DOCKER_CREDENTIALS_USR/banners-client .'
                    }
                }
            }
        }

        stage('Integration Test') {
            steps {
                script {
                    echo 'Running integration tests...'

                      def initSqlContent = '''CREATE DATABASE db;            
                            CREATE TABLE IF NOT EXISTS users (
                            id SERIAL PRIMARY KEY,
                            email VARCHAR(255) NOT NULL,
                            password VARCHAR(255) NOT NULL,
                            isadmin BOOLEAN DEFAULT false,
                            resetcode VARCHAR(255),
                            registration_time TIMESTAMP
                        );'''

                    writeFile file: 'scripts/init.sql', text: initSqlContent
                   
                    sh 'ls -alF'

                    def dockerfileContent = '''
                        FROM node:18-alpine AS builder
                        WORKDIR /app
                        COPY ./server/package*.json ./
                        RUN npm install
                        RUN npm install -D typescript
                        COPY ./server .
                        CMD ["npm", "test"]
                    '''
                    // Write Dockerfile content to a file
                    writeFile file: 'Dockerfile.test', text: dockerfileContent

                    // Build the Docker image for Express.js server
                    sh 'docker build -t server-test4 -f Dockerfile.test .'

                    // Run the Docker container for Express.js server
                    sh 'docker-compose up -f ./server/docker-compose.yaml -d'

                    // log the output of the container
                    sh 'docker logs -f server-test4'
                }
            }

            post {
                always {
                    script {
                        sh 'docker-compose down -v --remove-orphans'
                    }
                }
            }
        }
    }
    // post {
    //     always {
    //         cleanWs()
    //         // script {
    //         //     sh 'docker stop mongo-db'
    //         //     sh 'docker rm mongo-db'

    //         //     sh 'docker stop my-postgres'
    //         //     sh 'docker rm my-postgres'

    //         //     sh 'docker-compose down -v'
    //         // }
    //     }
    // }
}