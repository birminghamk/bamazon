# BAMAZON

A node application for purchasing items in an Amazon-type atmosphere.

https://user-images.githubusercontent.com/30732917/36571471-1576559c-17f4-11e8-8620-564509b805b3.gif

## How It Works

Upon running the associated file in Node (bamazonCustomer), the user will be prompted with a series of prompts from inquirer. Initially the user will be asked if they would like to purchase an item, and if they respond with 'Yes', a list of items along with their price and stock availability will be displayed. Another prompt will ask the user which item they would like to buy by name, followed by another prompt regarding how many units. If their unit request does not exceed the stock quantity for that product, their order will be processed and the inventory database in MySQL will be updated, and the total price will be displayed to the user. After purchasing an item, the user will be rerouted back to the initial prompt if they would like to purchase an item. 

## Technologies Utilized
	- NodeJS
	- Javascript
	- MySQL
	- npm packages:
		- MySQL
		- Inquirer

## Author

	Kate Birmingham
