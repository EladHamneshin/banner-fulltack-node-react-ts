pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                script {
                    dir('client') {
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
                    githubNotify context: 'Lint', status: 'SUCCESS'
                }
                failure {
                    githubNotify context: 'Lint', status: 'FAILURE'
                }
            }
        }
    }

    triggers {
        githubPush()
    }
}