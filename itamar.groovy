def gitUrl = 'https://github.com/nodecourse98/ShabetzNa-Server'

job('ShabetzNa-Unit-Testing') {
    scm {
        git(gitUrl)
    }
    triggers {
        scm('*/5 * * * *')
    }
    steps {
        shell('cd /var/lib/jenkins/workspace/ShabetzNa-Unit-Testing')
        shell('npm install')
        shell('npm test')
    }
}
