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
        }
    }
//test134
    triggers {
        githubPush()
    }

    post {
        success {
            script{
                sh 'echo "Linting passed. You may now merge."'
                currentBuild.setGitHubPRStatus(state: 'SUCCESS', description: 'Build and test passed successfully')
            }
            
        }
        failure {
            script{
                echo 'Pipeline failed. Blocking pull request merge.'
                currentBuild.setGitHubPRStatus(state: 'FAILURE', description: "Build and test failed. Error: ${e.message}")
            }
        }
    }

}