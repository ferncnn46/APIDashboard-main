# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /apiDashboard/frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .
COPY tailwind.config.js ./dist/static/css/

# Build the frontend
RUN npm run build

ENV HOST 0.0.0.0
# Expose the port that the application will listen on
EXPOSE 3000

# Start the frontend
CMD ["npm", "run", "start"]
