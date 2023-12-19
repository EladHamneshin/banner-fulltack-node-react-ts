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
        stage('helm chart clone') {
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
                    dir('helm-chart/devOps/charts/') {
                        // // Define the new values
                        // def new_tag = "latest"
                        // def new_repo = "\$DOCKER_CREDENTIALS_USR/banners-server"

                        // // Use sed to replace the values in the file
                        // sh "sed -i 's|^[ \\t]*tag: .*|tag: $new_tag|' values.yaml"
                        // sh "sed -i 's|^[ \\t]*repository: .*|repository: $new_repo|' values.yaml"

                        // Read YAML from file
                        def values = readYaml file: 'values.yaml'

                        // Update the values
                        values.deployment.client.image.tag = 'latest'
                        values.deployment.client.image.tag = 'latest'

                        sh 'rm -rf values.yaml'

                        // Write the updated values back to the file
                        writeYaml file: 'values.yaml', data: values

                        // Print the updated values
                        sh 'cat values.yaml'
                    }
                }
            }
        }



        // //helm chart push to git artifact repo with git credentials
        // stage('helm chart push') {
        //     steps {
        //         script {
        //             dir('helm-chart') {
        //                 withCredentials([usernamePassword(credentialsId: 'git-creds', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
        //                     sh 'git config --global user.email "
        //                     sh 'git config --global user.name "jenkins"'
        //                     sh 'git add .'
        //                     sh 'git commit -m "helm chart update"'
        //                     sh 'git push https://$GIT_USERNAME:$
        //                 }
        //             }
        //         }
        //     }
        // }


        



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