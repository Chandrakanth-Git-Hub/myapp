pipeline {
    agent any

    environment {
        REGISTRY_URL = "index.docker.io/v1/"
        IMAGE_NAME = "chandrakanth44/myapp"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo 'Pushing Docker image to Docker Hub...'

                    docker.withRegistry("https://${REGISTRY_URL}", "docker-cred") {
                        sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                    }
                }
            }
        }
    }

    post {
        failure {
            echo "Build failed!"
        }
        success {
            echo "Build succeeded! Image pushed."
        }
    }
}

