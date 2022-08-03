# TSC-Client Deploy

Deploy TSC-Client on AWS EC2 Ubuntu 18.04.

## Server Installation

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```
```bash
. ~/.nvm/nvm.sh
```

## node Configuration

Install node version 16.13.2 for TSC-Server

```bash
nvm install v16.13.2
```
## install nginx

After installing hit the server base IP and check if the default nginx page is loading or not if not fix that:
```bash
sudo apt-get install nginx
```
## install ufw
Install ufw to open port 3000:
```bash
sudo apt install ufw
```
pen port 3000:
```bash
sudo ufw allow 3000
```


## Deploy TSC-Server

Install Git:

```bash
sudo apt-get install git
```
Clone TSC-Client Repo:

```bash
https://github.com/DandPDevs/TSC-Client.git
```
Change directory to TSC-Server:

```bash
cd TSC-Client/
```
Install node modules:

```bash
npm install
```
Delete the build folder if exists:

```bash
sudo rm -r build/
```
Build the React App:

```bash
npm run build
```
Change the directory to root directory:

```bash
cd ~
```
Create a folder to store the deployment files:

```bash
mkdir frontend-deploy
```
Copy the build files to the deployment folder:

```bash
sudo cp -R TSC-Client/build/ frontend-deploy/
```
Create ```react.conf``` file in the ```/etc/nginx/conf.d``` directory:

```bash
sudo nano /etc/nginx/conf.d/react.conf
```
Write the following codes in ```react.conf```:

```bash
server {
  listen 3000;
  root /home/ubuntu/frontend-deploy/build;
  location / {
    try_files $uri /index.html;
  }
}
```

Check the ```nginx.conf``` file in ```/etc/nginx/``` directory if the following line is commented or not if not comment the line using nano:

```bash
#       include /etc/nginx/sites-enabled/*;
```
Check the nginx syntax is ok:

```bash
sudo nginx -t
```
Reload the nginx to sync the new configuration:

```bash
sudo service nginx reload
```


## Boom💥
Hit the BASE_IP:3000 of the ec2 server and see ishkool has been deployed.
## Note⚠️


Please make sure to add elastic ip and inbound rules.
In security group of AWS make the access of port 3000 public in both inbound and outbound rule.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
