pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url: 'https://github.com/EladHamneshin/banner-fulltack-node-react-ts']]])
                }
            }
        }

        stage('Install') {
            steps {
                script {
                    dir('client') {
                        sh 'echo "test1"'
                        sh 'echo "Installing dependencies..."'
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    dir('client') {
                        sh 'echo "Building..."'
                        sh 'docker build -t banner-client .'
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                echo 'Linting passed. You may now merge.'
                setGitHubPullRequestStatus(
                    state: 'SUCCESS',
                    context: 'ESLINT-banners',
                    message: 'Build and test passed',
                )
            }
        }
        
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                setGitHubPullRequestStatus(
                    state: 'FAILURE',
                    context: 'ESLINT-banners',
                    message: 'Build and test failed',
                )
            }
        }
    }
}
