pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                script {
                    dir('client') {
                        sh 'echo "Installing dependencies..."'
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    dir('client') {
                        try {
                            sh 'npm run lint'
                        } catch (Exception e) {
                            error("Linting failed. Please fix the linting errors before merging.")
                        }
                    }
                }
            }

            post {
                success {
                    sh 'echo "Linting passed. You may now merge."'
                    githubNotify context: 'Lint', status: 'SUCCESS'
                }
                failure {
                    sh 'echo "Linting failed. Please fix the linting errors before merging."'
                    githubNotify context: 'Lint', status: 'FAILURE'
                }
            }
        }
    }

    triggers {
        //githubPush()
        githubPullRequest()
    }
}