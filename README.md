﻿# server-node-mongo-ec2
backend of a blog: use node js + mongodb 
# Step 1: create an instance ec2 on aws
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