pipeline {
    agent any

    environment {
        PR_BRANCH = "${env.GITHUB_PULL_REQUEST}"
    }

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
                        sh 'npm run lint'
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
            script {
                echo 'Linting passed. You may now merge.'
                currentBuild.setGitHubPRStatus(state: 'SUCCESS', description: 'Build and test passed successfully')
            }
        }
        
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                currentBuild.setGitHubPRStatus(state: 'FAILURE', description: "Build and test failed on branch: ${PR_BRANCH}")
            }
        }
    }
}
// Path: Jenkinsfile
