# Deploying Nextjs15 Project on EC2

## Prerequisites

1.  We need a `EC2` instance or any other VM on AWS or GCP
2. We need a `Nextjs`  project , without any build errors 
3. We need `Docker Engine`  Installed in our system to run docker command and making Images 
4. And a `Domain`  on Hostinger , GoDaddy or Neamcheap to Put DNS Records 

## EC2 on AWS

- To make a EC2 on AWS with suitable process reffer to my AWS notion doc
    
    [🚀 How to Deploy Server on AWS     (EC2 + Nginx + Cert-bot + PM2 )](https://www.notion.so/How-to-Deploy-Server-on-AWS-EC2-Nginx-Cert-bot-PM2-1d58f02f77c7800b9cd2d71cd1402331?pvs=21)
    
- We just need a EC2 with ssh access after that use rest of process in this doc

## Installing Docker on EC2

```jsx
curl -fsSL https://get.docker.com | sudo bash
```

- Now to use docker without the sudo command

```jsx
sudo usermod -aG docker $USER
```

- To use Docker without any rebot or relogin

```jsx
newgrp docker
```

- Now test it

```jsx
docker --version
docker run hello-world
```

![image.png](image.png)

## Now Install Nginx on EC2

- **Install Nginx**:
Install Nginx to serve your app:
    
    ```bash
    sudo apt update
    sudo apt install nginx
    ```
    
- Open Nginx Config File:
    
    ```jsx
    sudo vim /etc/nginx/nginx.conf
    ```
    
- **Configure Nginx**:
    
    Set up Nginx to reverse proxy your app and serve it over HTTPS. Here's an example of an Nginx config:
    
    ```json
    events {
        # Event directives...
    }
    
    http {
    	server {
        listen 80;
        server_name mangaheaven.elitedev.tech; <put you domain>
    
        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    	}
    }
    ```
    
- **Adding Domain:**
    
    Add the IP of the Server points Domain 
    
    ![image.png](image%201.png)
    
- **Restart Nginx**:
Restart Nginx to apply the configuration:
    
    ```bash
    sudo nginx -s reload
    ```
    
    ![Screenshot 2025-04-14 141923.png](Screenshot_2025-04-14_141923.png)
    

## Added SSL Certificate using Certbot

- **Install `Certbot`** (for Let's Encrypt SSL):
Follow the `Certbot` instructions for Ubuntu to install `Certbot`  and obtain an `SSL` certificate.
    
    ```bash
    sudo snap install --classic certbot
    ```
    
- Install SSL Certificate using `Certbot`
    
    ```bash
    sudo certbot --nginx -d <yourDomain.com>
    ```
    

## Now Make the Docker Image in Your in Local PC

- Create a `Dockerfile`  in Root directly
    
    ```jsx
    FROM node:20-bullseye-slim
    
    WORKDIR /app
    
    RUN npm install -g pnpm@latest
    
    COPY package.json pnpm-lock.yaml* ./
    
    COPY . .
    
    RUN pnpm install --frozen-lockfile
    
    RUN pnpm prisma generate
    
    RUN pnpm build
    
    ENV NODE_ENV=production
    
    ENV PORT=3000
    
    EXPOSE 3000
    
    CMD ["pnpm", "start"]
    
    ```
    
- Create `.dockerignore`  in Root dir
    
    ```jsx
    node_modules
    .next
    .env
    ```
    
- Now create the Docker Image in Your Local PC
    
    ```jsx
    docker build -t mangahaven .
    ```
    
- Check if Image have building
    
    ```jsx
    docker images
    ```
    
- Run the image
    
    ```jsx
    docker run -p 3000:3000 --env-file .env backend-syndicate
    ```
    
- Run in Detached Mode
    
    ```jsx
    docker run -d --env-file .env -p 3000:3000 mangahaven
    ```
    
- Optional tagging (for Docker Hub or versioning)
    
    ```bash
    docker tag mangahaven yourdockerhubusername/mangahaven:latest
    ```
    
- Push to Docker Hub:
    
    ```bash
    docker push yourdockerhubusername/mangahaven:latest
    ```
    
    ![image.png](image%202.png)
    

## Docker hub

- To Upload the Images of the Project and Download it on EC2 We need a Docker Hub 
For That Simple go on [docker.com](http://docker.com/) and simple Login with github or google
    
    ![image.png](image%203.png)
    
- Now you should add your docker desktop and for terminal access you need to login you need to create `personal-access-token`

## Creating PAT (`personal-access-token`)

1. Click on Account Setting 
    
    ![image.png](image%204.png)
    
2. Click on Personal access token 
    
    ![image.png](image%205.png)
    
3. Create a New Token 
    
    ![image.png](image%206.png)
    
4. Give Read & Write access
    
    ![image.png](image%207.png)
    
5. Dont Forget to Copy the Password 
6. Now Login using terminal on both from local pc and from AWS (It also needed for CI/CD)
    
    ```bash
    docker login -u downloadmaster
    ```
    
    ![image.png](image%208.png)
    
7. Done Now you push you image or pull as well either it Public or Private
8. To Push A Image Create a Repository on DockerHub 
    
    ![image.png](image%209.png)
    

## Deploying the Website on EC2

- Pull the latest Image which you uploaded on the Docker Hub

```bash
docker pull downloadmaster/mangaheaven:latest
```

![image.png](image%2010.png)

- Now need to add the .env in the EC2 For that create a folder named of that project

```bash
mkdir mangaheaven
```

```bash
cd mangaheaven
```

```bash
vim .env
```

- To see the env file

```bash
ls -a 
```

![image.png](image%2011.png)

- Run the Docker Command to run the project in detached mode

```bash
docker run -d -p 3000:3000 --env-file .env downloadmaster/mangaheaven:latest
```

![image.png](image%2012.png)

- Boom Your website should be Live on the domain you have added in Nginx Config

# Manual Deployment (Nextjs + EC2 + Docker)

Now For Manual Deployment when ever someone made any push or made a PR on Production branch 

1. Checkout on `production`   Branch 
2. Do a git pull 
3. Build A new Docker Image 
4. Tag it latest and Push it to dockerhub 
5. then on EC2 Stop the Server , Delete the Image , Pull the new Image and Redeploy it. 

## CI/CD (Using Github Action → EC2)

Now As this process is time consuming min 10 min would take to do this , using github action we can automate this process 

1. First Create a github/worflows folder in Root of the project 

```bash
mkdir github
cd github 
mkdir workflows
```

![image.png](72fc8b6c-8af0-4e7f-8cce-44907879196a.png)

1. Create a deployprod.yml in workflows folder (name the file whateven you want)
2.