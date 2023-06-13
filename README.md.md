# README

## Project: Chappy chat-app

This repository contains a school project called chappy the chat app. The project is a full-stack web application and is built using Node.js, Express, JWT and lowdb. 
       
### Modeling

This modeling describes the structure for users and chat messages in an application. Below is an overview of the different properties and data types used.

#### User

  Properties:
    -   id: Unique identifier for the user (string)
    -   username: Username (string)
    -   password: Password (string)

#### ChatMessage

   Properties:
    -   userId: Identifies the user who sent the message (string)
    -   messages: Message text (string)
    -   timestamp: Time when the message was sent (timestamp) 
  
----

### Getting Started

To get started with the project webb application, follow the instructions below:

1.  Clone the repository to your local machine using the following command:    
    `https://github.com/MalinJ123/Chattyy2.git` 

### Features

The Chappy project offers the following features:

1.  Messages Information: Retrieve and display information about messages available through the RESTful API.
2.  User Details: Fetch and show details of users registered on the platform.

### Endpoints and HTTP Methods

The project interacts with the following endpoints using various HTTP methods:

#### `/messages` Endpoint

-   HTTP Method: `GET` `POST` `PUT` `DELETE`

-   Usage: This endpoint is used to retrieve, delete, change and get all messages available from the database.

##### Get message 
```
 [GET] /messages 
```
##### Get messages by ID
```
 [GET] /messages/:id
```
##### Add a message
```
 [POST] /messages 
 
{
	"userId": 1,
	"message": "Hej. Hur mår du?"
}
```
##### Delete all messages
```
 [DELETE] /messages 
```
##### Delete product by Id
```
 [DELETE] /messages/:id 
```
##### Edit a product 
```
 [PUT] /messages/:id  ==== FINNS INTE ÄNNU  . EXEMPEL
 {	
      "userId": 1,
      "message": "Edit message?"
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

	Malin Jonsson 

 
