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

	console.log("Connected as id " + connection.threadId + "\n");
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
		console.log(res[i].id + ". " + res[i].product_name + ", $" + res[i].price)
	}

	buyItem();
  }); 



} // END buyItem FUNCTION

function buyItem() {
	inquirer.prompt([
	{
		name: "choose_item",
		type: "input",
		message: "\nWhat product would you like to buy (by number ID)?"
	},
	{
		name: "itemQuantity",
		type: "input",
		message: "How many units would you like to buy?"
	}
	]).then(function(answers){
		console.log("\nYour purchase is being processed...\n");

		connection.query("SELECT * FROM products", function(err, res) {
			var productID = answers.itemQuantity;
			for (var i = 0; i < res.length; i++) {

				var id = res[i].id;

				if (id === parseInt(answers.choose_item)) {
					id = answers.choose_item;
					checkQuantity(id);

				}
			}
		}
	  );
	})
} // END BUY ITEM FUNCTION

function checkQuantity (id) {

	console.log(id);

	connection.query("SELECT * FROM products", function(err, res) {
		console.log(res);

		if (res.id === parseInt(id)) {
			console.log("item selected");
		}


	}) 

	// connection.query("UPDATE products SET ? WHERE ?",
	// 	[
	// 		{
	// 			stock_quantity: newQuantity
	// 		},
	// 		{
				
	// 		}

	// 	], 
	// 	function(err, res){
	// 	if (answers.itemQuantity - res.stock_quantity < 0) {
	// 		console.log("Insufficent quantity!");
	// 	} else {
	// 		var newQuantity = res.stock_quantity - answers.itemQuantity;

	// 	}
	// })
}

