#PRODUCTION BUILD
#----------------------------------------------------------------
# Which node version we want to use
FROM node:18-alpine as BUILD_IMAGE

# Tell Docker to create a directory so that other commands can use it
WORKDIR /app

# Copy our package.json and package-lock.json file into /app directory
COPY package.json /app

# Install all our packages
RUN npm install

# Copy all our remaining files from our local directory into /app code directory
COPY . /app

EXPOSE 5000

CMD ["npm", "run", "dev"]