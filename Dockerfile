FROM nikolaik/python-nodejs:python3.8-nodejs16
RUN pip install requests
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN npm run build
ENTRYPOINT npm run start:prod
