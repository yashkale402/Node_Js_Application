pipeline {
    agent any

    stages {

        stage('Check Tools') {
            steps {
                echo '🔍 Checking Node.js, npm, and PM2...'
                sh 'node -v'
                sh 'npm -v'
                sh 'pm2 -v'
            }
        }

        stage('Clone Code') {
            steps {
                echo '📥 Pulling latest code from GitHub...'
                git url: 'https://github.com/yashkale402/Node_Js_Application.git', branch: 'main'
            }
        }

        stage('Deploy to Server') {
            steps {
                echo '📂 Deploying to /var/www/html'
                sh '''
                    sudo find /var/www/html/ -mindepth 1 \
                        ! -path '*/node_modules/*' \
                        ! -name 'node_modules' \
                        ! -name 'database.sqlite' \
                        ! -name '.env' \
                        -delete || true

                    sudo cp -r public/ src/ views/ server.js package.json package-lock.json ecosystem.config.js /var/www/html/
                    sudo chown -R ubuntu:ubuntu /var/www/html/
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing production dependencies'
                sh '''
                    cd /var/www/html
                    sudo -u ubuntu npm install --omit=dev
                '''
            }
        }

        stage('Start App') {
            steps {
                echo '🚀 Starting app with PM2'
                sh '''
                    sudo -u ubuntu pm2 startOrRestart ecosystem.config.js --env production --update-env
                    sudo -u ubuntu pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo '✅ SUCCESS! App deployed successfully.'
        }
        failure {
            echo '❌ FAILED! Check logs.'
        }
    }
}
