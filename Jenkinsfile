pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Start Server') {
            steps {
                bat 'start /B node server.js'
            }
        }

        stage('Run Test') {
            steps {
                bat 'node test.js'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t student-demo .'
            }
        }

    }

    post {
        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }
    }
}
