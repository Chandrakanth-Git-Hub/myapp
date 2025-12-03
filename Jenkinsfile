pipeline {
    agent any

    environment {
        IMAGE_NAME = "chandrakanth44/myapp"
        REGISTRY_CREDENTIALS = "dockerhub-cred"
        REGISTRY_URL = ""
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
                    echo "Building myapp Docker image..."
                    dockerImage = docker.build("${IMAGE_NAME}:${BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Pushing myapp image to Docker Hub..."
                    docker.withRegistry("${REGISTRY_URL}", "${REGISTRY_CREDENTIALS}") {
                        dockerImage.push("${BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh """
                  docker rmi ${IMAGE_NAME}:${BUILD_NUMBER} || true
                  docker rmi ${IMAGE_NAME}:latest || true
                """
            }
        }
    }

    post {
        success {
            echo "Image pushed successfully: ${IMAGE_NAME}:${BUILD_NUMBER}"
        }
        failure {
            echo "Build failed!"
        }
    }
}
