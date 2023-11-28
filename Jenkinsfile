pipeline {
    agent {
        docker {
            image 'node:14-alpine'
        }
    }


    stages {
        stage('Build') {
            steps {
                script {
                    dir('client') {
                        sh 'docker run --rm -v $(pwd):/app -w /app node:alpine npm install'
                        sh 'npm install'
                        sh 'npm run build'
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
        }
    }

    triggers {
        githubPush()
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