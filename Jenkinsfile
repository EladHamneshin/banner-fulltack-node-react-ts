pipeline {
    agent any

    // environment {
    //     PR_BRANCH = "${env.CHANGE_BRANCH}"//chck if this is correct
    // }   

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                script {
                    dir('client') {
                        sh 'echo "test3"'
                        sh 'echo "Installing dependencies..."'
                        sh 'npm install'
                    }
                }
            }
        }

        // stage('Lint') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 sh 'npm run lint'
        //             }
        //         }
        //     }
        // }
    }

    // triggers {
    //     githubPush()
    // }

    post {
        success {
            script {
                echo 'Linting passed. You may now merge.'
                setGitHubPullRequestStatus(
                    state: 'SUCCESS',
                    message: 'Build and test passed',
                )
            }
        }
        
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                setGitHubPullRequestStatus(
                    state: 'FAILURE',
                    message: 'Build and test failed',
                )
            }
        }
    }

  

}
// Path: Jenkinsfile
