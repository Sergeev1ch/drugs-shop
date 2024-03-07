## Run application:

- you can follow the **[link](https://drugs-shop.fun)** and use the application 

## Run only client:

-  to run the client part on the local server, you need to download the repository
-  install dependencies using `npm install` in folder **client**
-  change `REACT_APP_CAPTCHA_API_KEY` and `REACT_APP_MAPS_API_KEY` in **client/.env**
-  execute `npm run start`

## Run client and server:

-  everything in the previous steps
-  change `REACT_APP_SERVER_URL` on `localhost:4000` in **client/.env**
-  install dependencies using `npm install` in folder **server**
-  change data in **server/.env** for you database
-  execute `npm start`