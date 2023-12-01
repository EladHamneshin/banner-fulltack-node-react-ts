pipeline {
    agent any

    stages {

         stage('Checkout') {
            steps {
                script {
                    def prBranch = "PR-${CHANGE_ID}-branch"
                    checkout([$class: 'GitSCM', branches: [[name: prBranch]], userRemoteConfigs: [[url: 'https://github.com/EladHamneshin/banner-fulltack-node-react-ts']]])
                }
            }
        }

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
                    currentBuild.setGitHubPRStatus(state: 'SUCCESS', description: 'Build and test passed successfully')
                }
                failure {
                    echo 'Pipeline failed. Blocking pull request merge.'
                    currentBuild.setGitHubPRStatus(state: 'FAILURE', description: "Build and test failed. Error: ${e.message}")
                }
            }
        }

        
        // stage('Build') {
        //     steps {
        //         script {
        //             dir('client') {
        //                 sh 'echo "Building..."'
        //                 sh 'npm run build'
        //             }
        //         }
        //     }
        // }
    }
//test1
    triggers {
        githubPush()
    }

}