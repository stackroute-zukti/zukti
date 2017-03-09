node {
  stage: 'Environment Variables'
  sh "env"

  stage 'Checkout Repository'
  git url: 'https://github.com/stackroute-zukti/zukti.git', branch: "master"

  stage 'Installing Dependencies'
echo pwd
    sh "npm install"

  stage 'Linting'
  sh "gulp lint"

  stage 'Testing'
  sh "npm run test"

}
