pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        DOCKER_CREDENTIALS = credentials('docker-hub-elad')
        TAG_NAME = ''
        TAG_EXISTS = 'false'
    }

    stages {
        // stage('Checkout') {
        //     steps {
        //         script {
        //             sh 'printenv'
        //             echo "Checking out code........"
        //             def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
        //             checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url:'https://github.com/yakovperets/zalmans-server.git']]])

        //             // Check if TAG_NAME exists
        //             TAG_NAME = sh(script: "git tag --contains ${env.GIT_COMMIT}", returnStdout: true).trim()

        //             // Remove the leading "v" from the tag name
        //             TAG_NAME = TAG_NAME.replaceAll(/[a-zA-Z]/, '')

        //             // Create a boolean variable based on the existence of TAG_NAME
        //             TAG_EXISTS = TAG_NAME != null && !TAG_NAME.isEmpty()

        //             if (TAG_EXISTS.toBoolean()) {
        //                 echo "GitHub Release Tag Name: ${TAG_NAME}"
        //                 // Add any other steps you need for when TAG_NAME exists
        //             } else {
        //                 echo "No GitHub Release Tag found."
        //                 // Add any other steps you need for when TAG_NAME does not exist
        //             }
        //         }
        //     }
        // }

        // stage('Lint') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 echo 'Linting...'
        //                 //sh 'npm run lint'
        //             }
        //         }
        //     }
        // }

        stage('test release') {
            when {
                branch 'release'
            }
            steps {
                script {
                    sh 'echo "test release"'
                }
            }
        }

          stage('test not release') {
            when {
                not {
                    branch 'release'
                }
            }
            steps {
                script {
                    sh 'echo "test not release"'
                }
            }
        }

        // stage('Install') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 echo 'Installing dependencies...'
        //                 sh 'npm cache clean --force'
        //                 sh 'npm install'
        //             }
        //         }
        //     }
        // }

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
        //                 sh 'docker build -t $DOCKER_CREDENTIALS_USR/banners-server:1.0.2 .'
        //                 //sh 'docker build -t banners-server .'
        //             }
        //         }
        //     }
        // }

        // stage('Client Build') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 // TODO: add arg for base url
        //                 echo 'Building Client...'
        //                 sh 'docker build -t $DOCKER_CREDENTIALS_USR/banners-client:1.0.2 .'
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

        //                 // Build the Docker image for TEST server
        //                 sh 'docker build -t server-test-class4 -f Dockerfile.test .'
                    
        //                 // Run the Docker container for Express.js server
        //                 sh 'docker-compose up -d'

        //                 // Log the output of the test
        //                 // TODO: rename container
        //                 sh 'docker logs -f server-test-class4'
        //             } 
        //         }
        //     }

        //     post {
        //         always {
        //             script {
        //                 dir('server') {
        //                     sh 'docker-compose down -v --remove-orphans'
        //                     sh 'docker rmi server-test-class4'
        //                 }
        //             }
        //         }
        //     }
        // }

    //     stage('Dockerhub Login') {
    //         steps {
    //             script{
    //                 sh 'echo "Logging in to Dockerhub..."'
    //                 sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'                		
    //                 sh 'echo "Login Completed"'   
    //             }      
    //         }
    //     }

    //     stage('Dockerhub Push') {
    //         steps {
    //             script {
    //                 sh 'echo "Pushing..."'
    //                 sh 'docker push $DOCKER_CREDENTIALS_USR/banners-server:1.0.2'
    //                 sh 'docker push $DOCKER_CREDENTIALS_USR/banners-client:1.0.2'
    //             }
    //         }
    //     }

    //     stage('Clone Helm Repo') {
    //         steps {
    //             script {
    //                 dir('helm-chart') {
    //                     // TODO: git tool
    //                     sh 'git clone https://github.com/Yakov-Damen/devOps.git'
    //                 }
    //             }
    //         }
    //     }

    //     stage('Update values.yaml') {
    //         steps {
    //             script {
    //                 dir('helm-chart/devOps/charts/demo-store/') {
    //                     def values = readYaml file: 'values.yaml'

    //                     values.deployment.client.image.tag = '1.0.2'
    //                     values.deployment.server.image.tag = '1.0.2'

    //                     sh 'rm -rf values.yaml'
    //                     writeYaml file: 'values.yaml', data: values
    //                 }
    //             }
    //         }
    //     }

    //     stage('Update Chart.yaml') {
    //         steps {
    //             script {
    //                 dir('helm-chart/devOps/charts/demo-store/') {
    //                     def values = readYaml file: 'Chart.yaml'
    //                     def currentVersion = values.version

    //                     def parts = currentVersion.split('\\.')
    //                     parts[-1] = parts[-1].toInteger() + 1

    //                     def newVersion = parts.join('.')
    //                     values.version = newVersion

    //                     sh 'rm -rf Chart.yaml'
    //                     writeYaml file: 'Chart.yaml', data: values
                        // sh 'cat Chart.yaml'
    //                 }
    //             }
    //         }
    //     }

    //     stage('Push helm') {
    //         steps {
    //             script {
    //                 dir('helm-chart/devOps/charts/demo-store/') {
    //                     withCredentials([gitUsernamePassword(credentialsId: 'dc9f43f7-8a44-4a8f-90f4-9116603bbbc7', gitToolName: 'git')]) {
    //                         sh 'git config --global user.email "hamneshin123@gmail.com"'
    //                         sh 'git config --global user.name "jenkins"'
    //                         sh 'git add .'
    //                         sh 'git commit -m "helm chart update"'
    //                         sh 'git push'
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // post {
    //     always {
    //        cleanWs()
    //         script {
    //             echo 'Cleaning workspace...'
    //             sh 'rm -rf helm-chart'
    //             sh 'docker rmi $DOCKER_CREDENTIALS_USR/banners-server:1.0.2'
    //             sh 'docker rmi $DOCKER_CREDENTIALS_USR/banners-client:1.0.2'
    //         }
    //     }
    // }
 
    //     stage('NextStage') {
    //         when {
    //             expression { TAG_EXISTS.toBoolean() }
    //         }
    //         steps {
    //             // This stage will only execute if TAG_EXISTS is true
    //             echo "Executing NextStage because TAG_EXISTS is true"
    //             echo "Using GitHub Release Tag Name in NextStage: ${TAG_NAME}"
    //             // Add any other steps for the NextStage
    //         }
        // }
}