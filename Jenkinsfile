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
    environment {
        PROJECT_NAME = 'human-review-ui'
        KUBERNETES_NAMESPACE = "${ciProject}"
    }
    agent {
        kubernetes {
            label 'jenkins-twistlock-sidecars'
            defaultContainer 'jnlp'
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    pod-template: jenkins-slave-sidecars
spec:
  containers:
  - name: twistlock-scanner
    image: docker-registry.default.svc:5000/labs-ci-cd/twistlock-scanner
    command:
    - cat
    tty: true
  - name: jenkins-slave-npm
    image: docker-registry.default.svc:5000/labs-ci-cd/jenkins-slave-npm
    tty: true
"""
        }
    }
    stages {
        stage('Quality And Security') {
            parallel {
                stage('Dependency Check') {
                    steps {
                        container ('jenkins-slave-npm') {
                            sh 'npm config set cache /tmp'
                            sh 'npm audit --json | npm-audit-html -o npm-audit-report.html'
                            publishHTML(target: [
                                reportDir             : './',
                                reportFiles           : 'npm-audit-report.html',
                                reportName            : 'NPM Audit Report',
                                keepAll               : true,
                                alwaysLinkToLastBuild : true,
                                allowMissing          : true
                            ])
                            sh 'npm-audit-ci-wrapper -t high --ignore-dev-dependencies'
                        }
                    }
                }
                stage('Compile & Test') {
                    steps {
                        container ('jenkins-slave-npm') {
                            sh 'npm --registry http://nexus-labs-ci-cd.apps.domino.rht-labs.com/repository/npm-group/ install'
                            sh 'npm run test:unit'
                            sh 'npm run build'
                            publishHTML(target: [
                                reportDir             : './',
                                reportFiles           : 'test-report.html',
                                reportName            : 'Jest Unit Test Report',
                                keepAll               : true,
                                alwaysLinkToLastBuild : true,
                                allowMissing          : true
                            ])
                            publishHTML(target: [
                                reportDir             : 'coverage/lcov-report',
                                reportFiles           : 'index.html',
                                reportName            : 'Jest Test Coverage Report',
                                keepAll               : true,
                                alwaysLinkToLastBuild : true,
                                allowMissing          : true
                            ])
                        }
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
                container ('jenkins-slave-npm') {
                    script {
                        withSonarQubeEnv('sonar') {
                            sh 'unset JAVA_TOOL_OPTIONS; ./sonar-scanner'
                        }
                        def qualitygate = waitForQualityGate()
                        if (qualitygate.status != "OK") {
                            error "Pipeline aborted due to quality gate failure: ${qualitygate.status}"
                        }
                    }
                }
            }
        }
        stage('Build Image') {
            steps {
                container ('jenkins-slave-npm') {
                    script {
                        openshift.withCluster() {
                            openshift.withProject(ciProject) {
                                openshift.selector('bc', 'vue-app').startBuild("--from-dir=dist/", '--wait')
                            }
                        }
                    }
                }
            }
        }
        stage('Twistlock Scan') {
            steps{
                container ('twistlock-scanner') {
                    script {
                        twistlockScan ca: '', cert: '', compliancePolicy: 'warn', dockerAddress: 'unix:///var/run/docker.sock', gracePeriodDays: 0, ignoreImageBuildTime: true, image: 'labs-test/vue-app', key: '', logLevel: 'true', policy: 'warn', requirePackageUpdate: false, timeout: 10
                        }
                }
            }
        }
        stage ('Twistlock Publish') {
            steps{
                container ('twistlock-scanner') {
                    script {
                        twistlockPublish ca: '', cert: '', dockerAddress: 'unix:///var/run/docker.sock', ignoreImageBuildTime: true, image: 'labs-test/vue-app', key: '', logLevel: 'true', timeout: 10
                        }
                }
            }
        }
        stage('Promote to TEST') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject(ciProject) {
                            openshift.tag("vue-app:latest", "${testProject}/vue-app:latest")
                        }
                    }
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
                    openshift.withCluster() {
                        openshift.withProject(ciProject) {
                            openshift.tag("vue-app:latest", "${devProject}/vue-app:latest")
                        }
                    }
                }
            }
        }
    }
}
