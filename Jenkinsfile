node {
  stage: 'Environment Variables'
  sh "env"

  stage 'Checkout Repository'
  git url: 'https://github.com/stackroute-zukti/zukti.git', branch: "master"

  stage 'Installing Dependencies'
    sh "npm install"
    sh 'echo pwd'

  stage 'Linting'
  sh "(cd ~/var/lib/jenkins/jobs/StackRoute_Immersive_Zukti/jobs/zukti/branches/master/workspace)"

  stage 'Testing'
  sh "npm run test"

}
