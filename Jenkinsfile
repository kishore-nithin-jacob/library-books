pipeline {
  agent any
  tools { nodejs 'node25' }   // <-- matches the NodeJS tool name you added in Jenkins (Node 25.1.0)

  options { timestamps(); ansiColor('xterm') }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Install')  { steps { sh 'npm ci' } }

    stage('Test') {
      steps { sh 'npm run ci:test' }
      post {
        always { junit allowEmptyResults: true, testResults: 'junit.xml' }
      }
    }

    stage('Build')    { steps { sh 'npm run ci:build' } }

    // Optional: also create a single zip artifact
    stage('Package (zip)') {
      steps { sh 'cd dist && zip -r ../dist.zip .' }
    }

    stage('Archive artifacts') {
      steps { archiveArtifacts artifacts: 'dist/**, dist.zip', fingerprint: true, onlyIfSuccessful: true }
    }
  }

  post {
    success { echo '✅ Build succeeded; artifacts archived.' }
    failure { echo '❌ Build failed. Check logs and test reports.' }
  }
}
