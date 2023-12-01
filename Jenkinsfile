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

    // triggers {
    //     githubPush()
    // }

    post {
        success {
            script {
                echo 'Linting passed. You may now merge.'
                githubChecks(
                    name: 'Jenkins Build',
                    conclusion: 'SUCCESS',
                    detailsURL: 'https://your-build-url',
                    output: [
                        title: 'Jenkins Build',
                        summary: 'Build and test passed successfully',
                        text: 'Detailed information about the build results.'
                    ]
                )
            }
        }
        
        failure {
            script {
                echo 'Pipeline failed. Blocking pull request merge.'
                githubChecks(
                    name: 'Jenkins Build',
                    conclusion: 'FAILURE',
                    detailsURL: 'https://your-build-url',
                    output: [
                        title: 'Jenkins Build',
                        summary: "Build and test failed on branch: ${PR_BRANCH}",
                        text: "Detailed information about the build failure."
                    ]
                )
            }
        }
    }

}
// Path: Jenkinsfile
