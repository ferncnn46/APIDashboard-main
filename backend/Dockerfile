# Use an official Node runtime as a parent image
FROM node:19-alpine

# Set the working directory to /app
WORKDIR /apiDashboard/backend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Build the backend
RUN npm run build

# Expose the port that the application will listen on
EXPOSE 3001

# Start the backend
CMD [ "npm", "start" ]
