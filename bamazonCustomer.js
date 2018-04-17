// requiring npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");


// connection to the database
var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,

	//username
	user: "root", 

	//password
	password: "root",
	database: "bamazon_db"

});


// after connecting to the DB, do this function
connection.connect(function(err){
	if (err) throw err;
	start();

});

// start function asks user if they want buy an item
function start() {
	inquirer.prompt ({
		name: "start",
		type: "confirm",
		message: "Would you like to purchase an item?"
	})
	.then(function(answer){
		// if user responds with yes
		if (answer.start === true) {
			console.log("\nStart Shopping Now!");
			// displays table of items for sale
			showItems();
		// if user responds with no
		} else {
			// reroutes to intial start prompt if user declines
			console.log("\nCome Back Soon!\n")
			start();
		}


	})

} 

// showItems function displays items in database as a table
function showItems () {
	// creates table constructor
	var table = new Table ({
		//columns to be displayed in table
		head: ['Item id', 'Product Name', 'Price', "Stock Availability"]
		// column widths
		, colWidths: [12, 30, 30, 40]
	});
	// connect to database, select everything from products table
	connection.query("SELECT * FROM products", function(err, res) {
	// loop through every item in products table
	for (var i = 0 ; i < res.length; i++ ) {
		// push each product to table constructor 
		table.push([res[i].id, res[i].product_name, "$ " + res[i].price, res[i].stock_quantity])
	}

	// logs table to console in string format
	console.log(table.toString());

	//run buyItem function
	buyItem();
  }); 



} 


// buyItem function allows user to buy item from table
function buyItem() {
	inquirer.prompt([
	{
		name: "choose_item",
		type: "input",
		message: "\nWhat product would you like to buy (by product name)?"
	},
	{
		name: "itemQuantity",
		type: "input",
		message: "How many units would you like to buy?"
	}
	]).then(function(answers){
		console.log("\nYour purchase is being processed...\n");
		// select everything from products table where product_name = user response
		connection.query("SELECT * FROM products WHERE ?", 
			{
				product_name: answers.choose_item.toLowerCase().trim()
			}, 
			function(err, res) {
			// if the quantity the user wants is less or equal to stock in database
			if (answers.itemQuantity <= res[0].stock_quantity) {
				console.log("--------------------------");
				console.log("Thank you for your order");
				var quantity = answers.itemQuantity;
				var response = answers.choose_item;
				// run updateInventory function with quantity, response arguments
				updateInventory(quantity, response);
			} else {
				// user specified quantity above stock quantity
				console.log("This order cannot be processed as your desired quantity exceeds our current stock.")
				// reroutes to buyItem function
				buyItem();
			}
		}
	  );
	})
} 


// updateInventory function updates inventory in database after user purchases item
function updateInventory (quantity, response) {
	// selects everything from products table where product_name = user response 
	connection.query("SELECT * FROM products WHERE ?", 
		{
			product_name: response
		},
		function(err, res) {
			// 
			var stock = res[0].stock_quantity;
			var price = res[0].price;
			var total = price * quantity;

			// tells user total cost of purchase
			console.log("\nYour total is: " + total);
			console.log("--------------------------");

			connection.query("UPDATE products SET ? WHERE ?",
				[
					{
						stock_quantity: stock - quantity
					},
					{
						product_name: response
					}
				],
				// if inventory successfully updated, run this function
				function(err, res) {
					if (err) throw err;
					console.log("\nInventory Updated!");
					// after purchasing item, back to start
					start();
				}
			)
	 })

} 

