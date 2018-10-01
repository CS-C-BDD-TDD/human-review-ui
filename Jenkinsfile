def ciProject = 'labs-ci-cd'
def testProject = 'labs-test'
def devProject = 'labs-dev'
openshift.withCluster() {
    openshift.withProject() {
        ciProject = openshift.project()
        testProject = ciProject.replaceFirst(/^labs-ci-cd/, 'labs-test')
        devProject = ciProject.replaceFirst(/^labs-ci-cd/, 'labs-dev')
    }
}

pipeline {
    agent {
        label 'jenkins-slave-npm'
    }
    environment {
        PROJECT_NAME = 'human-review'
        KUBERNETES_NAMESPACE = "${ciProject}"
        JAVA_TOOL_OPTIONS=""
    }
    stages {
        stage('Setup') {
            parallel {
                stage('Install SonarScanner') {
                    steps {
                        sh 'curl -L -o sonar-scanner.zip https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.2.0.1227-linux.zip'
                        sh 'unzip sonar-scanner.zip'
                        sh 'mv sonar-scanner-* sonar-scanner'
                    }
                }
                stage('Update NPM') {
                    steps {
                        sh 'npm install -g npm'
                    }
                }
            }
        }
        stage('Quality And Security') {
            parallel {
//                stage('Dependency Check') {
//                    steps {
//                        sh 'npm audit'
//                    }
//                }
                stage('Compile & Test') {
                    steps {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
                stage('Ensure SonarQube Webhook is configured') {
                    when {
                        expression {
                            withSonarQubeEnv('sonar') {
                                def retVal = sh(returnStatus: true, script: "curl -u \"${SONAR_AUTH_TOKEN}:\" http://sonarqube:9000/api/webhooks/list | grep Jenkins")
                                echo "CURL COMMAND: ${retVal}"
                                return (retVal > 0)
                            }
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonar') {
                            sh "curl -X POST -u \"${SONAR_AUTH_TOKEN}:\" -F \"name=Jenkins\" -F \"url=http://jenkins/sonarqube-webhook/\" http://sonarqube:9000/api/webhooks/create"
                        }
                    }
                }
            }
        }
        stage('Wait for SonarQube Quality Gate') {
            steps {
                script {
                    withSonarQubeEnv('sonar') {
                        sh './sonar-scanner/bin/sonar-scanner '
                    }
                    def qualitygate = waitForQualityGate()
                    if (qualitygate.status != "OK") {
                        error "Pipeline aborted due to quality gate failure: ${qualitygate.status}"
                    }
                }
            }
        }
        stage('Build Image') {
            steps {
                script {
                    openshift.selector('bc', PROJECT_NAME).startBuild("--from-dir=dist/", '--wait')
                }
            }
        }
        stage('Promote to TEST') {
            steps {
                script {
                    openshift.tag("${PROJECT_NAME}:latest", "${testProject}/${PROJECT_NAME}:latest")
                }
            }
        }
        stage('Promote to DEMO') {
            input {
                message "Promote service to DEMO environment?"
                ok "PROMOTE"
            }
            steps {
                script {
                    openshift.tag("${PROJECT_NAME}:latest", "${devProject}/${PROJECT_NAME}:latest")
                }
            }
        }
    }
}
