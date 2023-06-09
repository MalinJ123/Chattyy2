# README

## Ruby Dolphins fullstack project

This repository contains a school project for the group of Ruby Dolphins. The project is a full-stack web application and is built using Node.js, Express and lowdb. It aims to provide a platform for retrieving RESTful APIs that other frontend studens with knowledge about fetch can use. 

### Getting Started

To get started with the Ruby Dolphins webb application, follow the instructions below:

1.  Clone the repository to your local machine using the following command:    
    `git clone https://github.com/MalinJ123/Ruby_Dolphins.git` 
       
    

### Features

The Ruby Dolphins project offers the following features:

1.  Product Information: Retrieve and display information about various products available through the RESTful API.
2.  User Details: Fetch and show details of users registered on the platform.

### Endpoints and HTTP Methods

The Ruby Dolphins project interacts with the following endpoints using various HTTP methods:

#### `/search` Endpoint

-   HTTP Method: `GET`
-   Usage: This endpoint is used to search for specific products based on certain criteria.

```
 [GET] /search 
```
-------
#### `/products` Endpoint

-   HTTP Method: `GET` `POST` `PUT` `DELETE`

-   Usage: This endpoint is used to retrieve, delete, change and get a list of all products available.
##### Get product 
```
 [GET] /products 
```
##### Get product by ID
```
 [GET] /products/:id
```
##### Add a product
```
 [POST] /products 
 
 {
      "name": "solglasögon",
      "price": 99,
	  "image": "image3.jpg",
      "tags": ["sol","accessoar","mode"]
    }
```
##### Delete all products
```
 [DELETE] /products 
```
##### Delete product by Id
```
 [DELETE] /products/:id 
```
##### Edit a product 
```
 [PUT] /products/:id 
 {
      "id": 1,
      "name": "ZORRO",
      "price": 122,
      "image": "image3.jpg",
      "tags": ["Små","fluffiga","mode"]
    }
```
____________________

#### `/users` Endpoint

-   HTTP Method: `GET` `POST` `PUT` `DELETE`

-   Usage: This endpoint is used to retrieve, delete, change and fetch a list of all users available.
##### Get users
```
 [GET] /users 
```
-   `GET`: Used to fetch users.

##### Get users by ID
```
 [GET] /users/:id
```
-   `GET`: Used to fetch a user by id.

##### Add a user
```
 [POST] /user 
 
	{
		"id": 2,
		"username": "Alice in wonderland",
		"password": "user2"
	}
```
-   `POST`: Used to create a new  user.
##### Delete user by Id
```
 [DELETE] /user/:id 
```
-   `DELETE`: Used to delete an existing user.

##### Edit users 
```
 [PUT] /users/:id
```
-   `PUT`: Used to update an existing resource, such as modifying a user.
____________________

### Development

To run this fullstack application in development mode, simply open the `index.html` file in your preferred web browser. Any changes you make to the code can be tested and previewed directly in the browser.


### Contributing

Contributions goes to 
	Ali Al-Nasir,
	Malin Jonsson, 
	Mustafa Zeinali, 
	Victor Bergström 
 
