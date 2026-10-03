pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        stage('Entorno') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Instalar dependencias') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Pruebas unitarias') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'reports/junit.xml'
            archiveArtifacts artifacts: 'dist/**, reports/junit.xml', allowEmptyArchive: true
        }
        success {
            echo 'Pipeline OK: el carrito de TiendaExpress compila y pasa todas las pruebas.'
        }
        failure {
            echo 'Pipeline FALLIDO: revisa la etapa en rojo y el log de consola.'
        }
    }
}
