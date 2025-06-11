FROM node:24

WORKDIR /app

COPY package*.json ./

# Copy the entire prisma directory (not just schema)
COPY prisma/ ./prisma/

# Install dependencies
RUN npm ci

COPY . .

CMD [ "npm", "run", "start:prod" ]