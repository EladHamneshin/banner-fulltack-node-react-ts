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
                        sh 'docker build -t $DOCKER_CREDENTIALS_USR/banners-server:latest .'
                        //sh 'docker build -t banners-server .'
                    }
                }
            }
        }

        stage('Client Build') {
            steps {
                script {
                    dir('client') {
                        echo 'Building Client...'
                        sh 'docker build -t $DOCKER_CREDENTIALS_USR/banners-client:latest .'
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
                    dir('server') {
                        sh 'docker-compose up -d'
                        // log the output of the container
                        sh 'docker logs -f server-test4'
                    }
                   
                }
            }

            post {
                always {
                    script {
                        dir('server') {
                            sh 'docker-compose down -v --remove-orphans'
                            sh 'docker rmi server-test4'
                        }
                    }
                }
            }
        }

        stage('dockerhub login') {
            steps {
                script{
                    sh 'echo "Logging in to Dockerhub..."'
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'                		
                    sh 'echo "Login Completed"'   
                }      
            }
        }

        stage('dockerhub push') {
            steps {
                script {
                    sh 'echo "Pushing..."'
                    sh 'docker push $DOCKER_CREDENTIALS_USR/oms-server:latest'
                    sh 'docker push $DOCKER_CREDENTIALS_USR/oms-client:latest'
                }
            }
        }
    }

    post {
        always {
            // cleanWs()
            script {
                echo 'Cleaning workspace...'
                sh 'docker rmi $DOCKER_CREDENTIALS_USR/banners-server:latest'
                sh 'docker rmi $DOCKER_CREDENTIALS_USR/banners-client:latest'
            }
        }
    }
}