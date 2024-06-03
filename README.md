# server-node-mongo-ec2
backend of a blog: use node js + mongodb 
# Step 1: Create an instance ec2 on aws
Note: use:
+ security groups: allows inbound rules: port 22 (SSH), 80(HTTP), 443(HTTPS), 3000(server-nodejs)
  ![image](https://github.com/thong-ltv/server-nodejs/assets/89473403/0f36db36-4586-41a1-a560-2262d61c67bb)
  outbound rules:
  ![image](https://github.com/thong-ltv/server-nodejs/assets/89473403/ec8ee8bb-7a65-4c47-ad17-2e88619f24af)
+ key pair: type: rsa
  ![image](https://github.com/thong-ltv/server-nodejs/assets/89473403/1f41e574-cb7d-439b-b7f6-5cdb30b92b41)
+ Ubuntu machine
+ instance type: t2.micro (free tier eligible)
+ other settings: default
# Step2: Connect to instance type: EC2 instance connect
# Step 3: Install NodeJS and NPM using nvm
Install node version manager (nvm) by typing the following at the command line.
```
sudo su -

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```
Activate nvm by typing the following at the command line.
```
. ~/.nvm/nvm.sh
```
Use nvm to install the latest version of Node.js by typing the following at the command line.
```
nvm install node
```
Test that node and npm are installed and running correctly by typing the following at the terminal:
```
node -v
npm -v
```
# Step 4: Install Git and clone repository from GitHub
To install git, run below commands in the terminal window:
```
apt-get update -y
```
```
apt-get install git -y
```
Just to verify if system has git installed or not, please run below command in terminal:
```
git --version
```
This command will print the git version in the terminal.

Run below command to clone the code repository from Github:
```
git clone https://github.com/thong-ltv/server-nodejs.git
```
Get inside the directory and Install Packages
```
cd server-nodejs
```
```
npm install
```
Start the application To start the application, run the below command in the terminal:
```
npm run serve
```
