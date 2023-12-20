pipeline {
    agent any

    triggers {
        githubPush()
    }

    // TODO: git tool
    //todo add tag 
    //todo send env to compose
    //todo change version in npm
    environment {
        DOCKER_CREDENTIALS = credentials('docker-hub-elad')
        TAG_NAME = ''
        TAG_EXISTS = 'false'
    }

    stages {

        stage('Checkout') {
            when {
                expression {
                    env.GIT_BRANCH == 'origin/main'
                }
            }
            steps {
                script {
                    echo 'Checking out...'
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url:'https://github.com/EladHamneshin/banner-fulltack-node-react-ts.git']]])
                }
            }
        }

        stage('Set Tag Name') {
            when {
                expression {
                    env.GIT_BRANCH == 'origin/release'
                }
            }
            steps {
                script {
                    TAG_NAME = sh(script: "git tag --contains ${env.GIT_PREVIOUS_COMMIT}", returnStdout: true).trim()
                    TAG_NAME = TAG_NAME.replaceAll(/[a-zA-Z]/, '')

                    TAG_EXISTS = TAG_NAME != null && !TAG_NAME.isEmpty()

                    if (TAG_EXISTS.toBoolean()) {
                        echo "GitHub Release Tag Name: ${TAG_NAME}"
                    } else {
                        echo "No GitHub Release Tag found."
                    }
                }
            }
        }

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

        stage('Install') {
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

        stage('Integration Test') {
            steps {
                script {
                    dir('server') {
                        echo 'Running integration tests...'

                        def dockerfileContent = '''
                            FROM node:18-alpine AS builder
                            WORKDIR /app
                            COPY /package*.json ./
                            RUN npm install
                            RUN npm install -D typescript
                            COPY . .
                            CMD ["npm", "test"]
                        '''
                        writeFile file: 'Dockerfile.test', text: dockerfileContent

                        sh 'docker-compose up -d --build'

                        sh 'docker logs -f server-test-class4'
                    } 
                }
            }

            post {
                always {
                    script {
                        dir('server') {
                            sh 'docker-compose down --rmi all -v --remove-orphans'
                        }
                    }
                }
            }
        }

        stage('Server Build') {
            when {
                expression {
                env.GIT_BRANCH == 'origin/release'
                }
            }
            steps {
                script {
                    dir('server') {
                        echo 'Building Server...'
                        sh "docker build -t $DOCKER_CREDENTIALS_USR/banners-server:${TAG_NAME} ."    
                    }
                }
            }
        }

        stage('Client Build') {
            when {
                expression {
                    env.GIT_BRANCH == 'origin/release'
                }
            }
            steps {
                script {
                    dir('client') {
                        // TODO: add arg for base url
                        echo 'Building Client...'
                        sh "docker build -t $DOCKER_CREDENTIALS_USR/banners-client:${TAG_NAME} ." 
                    }
                }
            }
        }

            stage('Dockerhub Login') {
                when {
                    expression {
                        env.GIT_BRANCH == 'origin/release'
                    }
                }
                steps {
                    script{
                        sh 'echo "Logging in to Dockerhub..."'
                        sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'                		
                        sh 'echo "Login Completed"'   
                    }      
                }
            }

            stage('Dockerhub Push') {
                when {
                    expression {
                        env.GIT_BRANCH == 'origin/release'
                    }
                }
                steps {
                    script {
                        sh 'echo "Pushing..."'
                        sh "docker push $DOCKER_CREDENTIALS_USR/banners-server:${TAG_NAME}"
                        sh "docker push $DOCKER_CREDENTIALS_USR/banners-client:${TAG_NAME}"
                    }
                }
            }

            stage('Clone Helm Repo') {
                when {
                    expression {
                        env.GIT_BRANCH == 'origin/release'
                    }
                }
                steps {
                    script {
                        dir('helm-chart') {
                            sh 'git clone https://github.com/Yakov-Damen/devOps.git'
                        }
                    }
                }
            }

            stage('Update values.yaml') {
                when {
                    expression {
                        env.GIT_BRANCH == 'origin/release'
                    }
                }
                steps {
                    script {
                        dir('helm-chart/devOps/charts/demo-store/') {
                            def values = readYaml file: 'values.yaml'

                            values.deployment.client.image.tag = "${TAG_NAME}"
                            values.deployment.server.image.tag = "${TAG_NAME}"

                            sh 'rm -rf values.yaml'
                            writeYaml file: 'values.yaml', data: values
                        }
                    }
                }
            }

        stage('Update Chart.yaml') {
            when {
                expression {
                    env.GIT_BRANCH == 'origin/release'
                }
            }
            steps {
                script {
                    dir('helm-chart/devOps/charts/demo-store/') {
                        def values = readYaml file: 'Chart.yaml'
                        def currentVersion = values.version

                        def parts = currentVersion.split('\\.')
                        parts[-1] = parts[-1].toInteger() + 1

                        def newVersion = parts.join('.')
                        values.version = newVersion

                        sh 'rm -rf Chart.yaml'
                        writeYaml file: 'Chart.yaml', data: values
            sh 'cat Chart.yaml'
                    }
                }
            }
        }

        stage('Push helm') {
            when {
                expression {
                    env.GIT_BRANCH == 'origin/release'
                }
            }
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
            cleanWs()
            script {
                echo 'Cleaning workspace...'
                sh 'rm -rf helm-chart'
                sh "docker rmi $DOCKER_CREDENTIALS_USR/banners-server:${TAG_NAME}"
                sh "docker rmi $DOCKER_CREDENTIALS_USR/banners-client:${TAG_NAME}"
            }
        }
    }
}
