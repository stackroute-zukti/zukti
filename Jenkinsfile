node {
  stage: 'Environment Variables'
  sh "env"

  stage 'Checkout Repository'
  git url: 'https://github.com/stackroute-zukti', branch: "master"

  stage 'Installing Dependencies'
  sh "npm prune"
  sh "npm install"

  stage 'Linting'
  sh "gulp lint"

  stage 'Testing'
  sh "npm run test"

}
