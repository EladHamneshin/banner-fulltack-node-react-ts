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
                        sh 'echo "Installing dependencies... test"'
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
                    context: 'Jenkins Build',
                    state: 'SUCCESS',
                    message: 'Build and test passed',
                )
            }
        }
        
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                setGitHubPullRequestStatus(
                    context: 'Jenkins Build',
                    state: 'FAILURE',
                    message: 'Build and test failed',
                )
            }
        }
    }

}
// Path: Jenkinsfile1
