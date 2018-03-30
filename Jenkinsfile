pipeline {
  agent {
    docker {
      image 'node:alpine'
    }
    
  }
  stages {
    stage('clone webApp') {
      parallel {
        stage('Clone webApp') {
          steps {
            git(url: 'https://github.com/jleveau/LCV-webapp.git', branch: 'master')
          }
        }
        stage('Clone events') {
          steps {
            git(url: 'https://github.com/jleveau/LCV-angular.git', branch: 'prod')
          }
        }
        stage('Clone angular') {
          steps {
            git(url: 'https://github.com/jleveau/LCV-angular.git', branch: 'prod')
          }
        }
      }
    }
    stage('') {
      steps {
        sh 'cv LCV-events && npm install'
      }
    }
  }
}