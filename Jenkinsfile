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

        // stage('Unit Test') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 echo 'Running unit tests...'
        //                 sh 'npm run test'
        //             }
        //         }
        //     }
        // }

        // stage('Server Build') {
        //     steps {
        //         script {
        //             dir('server') {
        //                 echo 'Building Server...'
        //                 sh 'docker build -t $DOCKER_CREDENTIALS_USR/banners-server:latest .'
        //                 //sh 'docker build -t banners-server .'
        //             }
        //         }
        //     }
        // }

        // stage('Client Build') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 echo 'Building Client...'
        //                 sh 'docker build -t $DOCKER_CREDENTIALS_USR/banners-client:latest .'
        //             }
        //         }
        //     }
        // }

        // stage('Integration Test') {
        //     steps {
        //         script {
        //             dir('server') {
        //                 echo 'Running integration tests...'

        //                 def dockerfileContent = '''
        //                     FROM node:18-alpine AS builder
        //                     WORKDIR /app
        //                     COPY /package*.json ./
        //                     RUN npm install
        //                     RUN npm install -D typescript
        //                     COPY . .
        //                     CMD ["npm", "test"]
        //                 '''
        //                 // Write Dockerfile content to a file
        //                 writeFile file: 'Dockerfile.test', text: dockerfileContent

        //                 // Build the Docker image for Express.js server
        //                 sh 'docker build -t server-test4 -f Dockerfile.test .'
                    
        //                 // Run the Docker container for Express.js server
        //                 sh 'docker-compose up -d'

        //                 // Log the output of the test
        //                 sh 'docker logs -f server-test4'
        //             } 
        //         }
        //     }

        //     post {
        //         always {
        //             script {
        //                 dir('server') {
        //                     sh 'docker-compose down -v --remove-orphans'
        //                     sh 'docker rmi server-test4'
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('dockerhub login') {
        //     steps {
        //         script{
        //             sh 'echo "Logging in to Dockerhub..."'
        //             sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'                		
        //             sh 'echo "Login Completed"'   
        //         }      
        //     }
        // }

        // stage('dockerhub push') {
        //     steps {
        //         script {
        //             sh 'echo "Pushing..."'
        //             sh 'docker push $DOCKER_CREDENTIALS_USR/banners-server:latest'
        //             sh 'docker push $DOCKER_CREDENTIALS_USR/banners-client:latest'
        //         }
        //     }
        // }

        //clone helm chart repo
        stage('clone helm chart') {
            steps {
                script {
                    dir('helm-chart') {
                        sh 'git clone https://github.com/Yakov-Damen/devOps.git'
                    }
                }
            }
        }

        stage('Update values.yaml') {
            steps {
                script {
                    dir('helm-chart/devOps/charts/demo-store/') {
                        // Read YAML from file
                        def values = readYaml file: 'values.yaml'

                        // Update the values
                        values.deployment.client.image.tag = 'latest'
                        values.deployment.server.image.tag = 'latest'

                        sh 'rm -rf values.yaml'

                        // Write the updated values back to the file
                        writeYaml file: 'values.yaml', data: values
                    }
                }
            }
        }

        stage('update Chart.yaml version') {
            steps {
                script {
                    dir('helm-chart/devOps/charts/demo-store/') {
                        // Read YAML from file
                        def values = readYaml file: 'Chart.yaml'

                        // Get the current version number
                        def currentVersion = values.version

                        // Split the version number into parts
                        def parts = currentVersion.split('\\.')

                        // Increment the last part of the version number
                        parts[-1] = parts[-1].toInteger() + 1

                        // Join the parts back together to get the new version number
                        def newVersion = parts.join('.')

                        // Update the version number in the values
                        values.version = newVersion

                        sh 'rm -rf Chart.yaml'

                        // Write the updated values back to the file
                        writeYaml file: 'Chart.yaml', data: values

                        sh 'cat Chart.yaml'
                    }
                }
            }
        }

        stage('push helm chart') {
            steps {
                script {
                    dir('helm-chart/devOps/charts/demo-store/') {
                        withCredentials([gitUsernamePassword(credentialsId: 'dc9f43f7-8a44-4a8f-90f4-9116603bbbc7', gitToolName: 'git')]) {
                            sh 'git config --global user.email "hamneshin123@gmail.com"'
                            sh 'git config --global user.name "jenkins"'
                            sh 'git add .'
                            sh 'git commit -m "helm chart update"'
                            sh 'git push'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // cleanWs()
            script {
                echo 'Cleaning workspace...'
                sh 'rm -rf helm-chart'
                // sh 'docker rmi $DOCKER_CREDENTIALS_USR/banners-server:latest'
                // sh 'docker rmi $DOCKER_CREDENTIALS_USR/banners-client:latest'
            }
        }
    }
}