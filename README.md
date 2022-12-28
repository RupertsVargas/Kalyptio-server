# Kalyptio-server


## Available Scripts

In the project directory, you can run:

### `npm start`



![Kalyptio Logo](./kalyptio.png "Kalyptio Logo")
# Kalyptio Fullstack Code Challenge

A garage parking which manages plenty of car spaces needs to develop an app in order to create, delete, list and filter their available parking spaces. Your mission is to build a webapp in order to solve the company's needs for the following use case:

A person is searching for a parking space between the 1st of October and the 30th of April. He/she is prompted with three different options; parking space A in Street A #35, California, CA, parking space B in Street B #27, California, CA, and parking space C in Street C #7, California, CA.
Parking space A will cost 100USD per month, Parking space B will cost 175USD per month, and Parking space C will cost 200USD per month.

The platform will show him/her the spaces available with the following requirements:


---
## Server requirements description

We’d expect the server to expose the following endpoints:

1. Create new car parking.
2. List parkings (You can filter parkings by using query params).
3. List parking details.
4. Delete parkings.

Required data to create a Parking: 

1. Address.
2. Amenities.
3. Score.
4. Price.
5. Type (Public / Private).
6. Images (up to 5 images).
7. Description.

Server will be able to filter parkings according to the following params:

1. Max total price for stay.
2. Min total price for stay.
3. Type.
4. Amenities.

Backend solution should be written in NodeJs + express and shouldn´t use any external database. Database must be simulated with an array.

The solution should be written using Typescript and bonus points will be awarded for the use of Docker.
