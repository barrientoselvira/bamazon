# bamazon

BAMazon
An Amazon-like store front using Node.js and MySQL.

Getting Started
Clone repo.
Run command in Terminal or Gitbash 'npm install'
Run command depending which mode you would like to be on:
Customer - 'npm run customer'
Run 'ctrl + c' to exit each mode
What Each JavaScript Does
BamazonCustomer.js

Prints the products in the store.

Prompts customer which product they would like to purchase by ID number.

Asks for the quantity.

If there is a sufficient amount of the product in stock, it will return the total for that purchase.
However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
If the purchase goes through, it updates the stock quantity to reflect the purchase.
It will also update the product sales in the department table.


![image](https://user-images.githubusercontent.com/11013651/42006454-8408787a-7a3f-11e8-9500-be9bba324ea4.png)
