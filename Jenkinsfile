pipeline {
    agent any

    // environment {
    //     PR_BRANCH = "${env.CHANGE_BRANCH}"//chck if this is correct
    // }   

    stages {
        stage('Checkout') {
              steps {
                script {
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH
                    checkout([$class: 'GitSCM', branches: [[name: "*/${GITHUB_PR_SOURCE_BRANCH}"]], userRemoteConfigs: [[url: 'https://github.com/EladHamneshin/banner-fulltack-node-react-ts']]])
                    sh 'printenv'
                }
            }
        }

        stage('Install') {
            steps {
                script {
                    dir('client') {
                        sh 'echo "test"'
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
