# Rocket League Marketplace(Demo)

This is my implementation of a Rocket League marketplace. You can browse and buy decals, car models, wheels, boosts, antennas, and goal explosions.

## Installation

Clone the Repository to the desired location.

Traverse to the repo and use the package manager [npm](https://www.npmjs.com/) to install necessary dependencies.

```bash
npm i
```

Once all dependencies are installed, sign up for [MongoDB](https://www.mongodb.com/) and create a free cluster. Then choose to connect to the cluster via drivers to get a MongoDB URI.

Create a .env file in the root directory with the following:

```bash
PORT=8080
DATABASE_URI=[MongoDB URI]
```

Once the .env file has been created, start up the server and client with:

```bash
npm run dev
```

To view the project, go to [http://localhost:8080/](http://localhost:8080/)

## Features
+ Buy/Sell Items.
+ Account Creation and Customization.
+ Persistent Login.
+ Protected Routes.
+ MERN stack integration.
+ React Query integration.

## Future Additions

+ Search Items
+ Profile picture customization.
+ Transactions page.
+ Proper images for all items.
+ prepopulated users and items.
+ Enhance the buying and selling interaction.
