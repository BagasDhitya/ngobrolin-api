# set versi node.js di dockernya
FROM node:18-alpine

# set workdir di dalam container
WORKDIR /app

# copy package.json
COPY package*.json ./

# install dependencies
RUN npm install --include=dev

# copy semua source ke dalam container
COPY . .

RUN npx prisma generate

# build app
RUN npx tsc --skipLibCheck

# expose port
EXPOSE 8000

# running app
CMD ["node", "dist/app.js"]