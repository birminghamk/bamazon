var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,

	//username
	user: "root",

	//password
	password: "root",
	database: "bamazon_db"

});

connection.connect(function(err){
	if (err) throw err;
	start();

});

function start() {
	inquirer.prompt ({
		name: "start",
		type: "confirm",
		message: "Would you like to purchase an item?"
	})
	.then(function(answer){
		if (answer.start === true) {
			console.log("\nStart Shopping Now!");
			showItems();
		} else {
			console.log("\nCome Back Soon!\n")
			start();
		}


	})

} // END START FUNCTION

function showItems () {
	connection.query("SELECT * FROM products", function(err, res) {
	for (var i = 0 ; i < res.length; i++ ) {
		console.log(res[i].id + ". " + res[i].product_name + ", $" + res[i].price + ", " + res[i].stock_quantity + " in stock")
	}

	buyItem();
  }); 



} // END buyItem FUNCTION

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

		connection.query("SELECT * FROM products WHERE ?", 
			{
				product_name: answers.choose_item.toLowerCase().trim()
			}, 
			function(err, res) {
			if (answers.itemQuantity <= res[0].stock_quantity) {
				console.log("--------------------------");
				console.log("Thank you for your order");
				var quantity = answers.itemQuantity;
				var response = answers.choose_item;
				updateInventory(quantity, response);
			} else {
				console.log("This order cannot be processed as your desired quantity exceeds our current stock.")
				buyItem();
			}
		}
	  );
	})
} // END BUY ITEM FUNCTION

function updateInventory (quantity, response) {

	connection.query("SELECT * FROM products WHERE ?", 
		{
			product_name: response
		},
		function(err, res) {
			var stock = res[0].stock_quantity;
			var price = res[0].price;
			var total = price * quantity;

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
				function(err, res) {
					if (err) throw err;
					console.log("\nInventory Updated!");
					start();
				}
			   )
	 })

} // END CHECK QUANTITY FUNCTION

