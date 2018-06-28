var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // username
  user: "root",
  // password
  password: "root",
  database: "bamazon"
});
var purchased= [];
connection.connect();
//connect to the mysql database and pull the information to the user
connection.query('SELECT item_id, product_name, department_name, price FROM Products', function(err, result){
    if(err) console.log(err);
    //table for the information from the mysql database 
    var table = new Table({
        head: ['Item Id#', 'Product Name', 'Category', 'Price'],
        style: {
            head: ['green'],
            compact: false,
            colAligns: ['center'],
        }
    });
    //loops through each item in the mysql database and pushes the information 
    for(var i = 0; i < result.length; i++){
        table.push(
            [result[i].item_id, result[i].product_name, result[i].department_name, result[i].price]
        );
    }
    console.log(table.toString());
    runBamazon();
});
// make sure the user enters proper whole number
function wholeNumber(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);
    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Errr...please enter a whole number.';
    }
}
// the function that lets the user purchase the items on BAMAZON
function runBamazon() {
    inquirer.prompt([
    
        {
            type: 'input',
            name: 'item_id',
            message: 'Please, enter the Item Number you would like purchase.',
            validate: wholeNumber,
            filter: Number
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many of this item would you like to buy?',
            validate: wholeNumber,
            filter: Number
        }
    ]).then(function(input) {
        //places these responses in the variable customerPurchase
        var customerPurchase = {
            ItemID: input.item_id,
            Quantity: input.stock_quantity
        };
        
        //the variable established above is pushed to the 'purchased' array 
        purchased.push(customerPurchase);
        // console.log(purchased);
        // console.log(purchased[0].ItemID);
        //connects to the mysql database and selects the item the user selected above based on the item id number entered
        connection.query('SELECT * FROM products WHERE item_id=?', purchased[0].ItemID, function(err, res){
                if(err) console.log(err, 'That item ID doesn\'t exist');
                // console.log(res);
                
                //alert if stock is less than what the customer wants
                if(res[0].stock_quantity < purchased[0].Quantity){
                    console.log('Whoops! Looks like we ranout of that item. Come again!');
                    connection.end();
                //otherwise if the stock amount available is more than or equal to the amount being asked for then we are ago
                } else if(res[0].stock_quantity >= purchased[0].Quantity){
                    console.log('');
                    console.log(purchased[0].Quantity + ' items purchased');
                    console.log(res[0].product_name + ' ' + res[0].price);
                    //this creates the variable SaleTotal that contains the total amount the user is paying for this total puchase
                    var totalSales = res[0].price * purchased[0].Quantity;
                    console.log('Total: ' + totalSales);
                    //this variable contains the newly updated stock quantity of the item purchased
                    newQuantity = res[0].stock_quantity - purchased[0].Quantity;
            
                    // connects to the mysql database products and updates the stock quantity for the item puchased
                    connection.query("UPDATE Products SET StockQuantity = " + newQuantity +" WHERE ItemID = " + purchased[0].itemID, function(err, res){
                        // if(err) throw err;
                        // console.log('Problem ', err);
                        console.log('');
                        console.log(colors.cyan(''));
                        console.log('');
                        connection.end();
                    })
                };
        })
    })
    
};


