var inquirer = require("inquirer");

inquirer.prompt([
{
	type: "input",
	message: "What product would you like to buy(by ID)?",
	name: "product"
},
{
	type: "input",
	message: "How many units would you like to buy?",
	name: "quantity"
}





]).then(function(user){

})

