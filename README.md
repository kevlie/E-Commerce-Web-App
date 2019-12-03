## CSC309 Project Description
This is a website for online shopping intended to provide customers with the ability to browse through various shoes and watches and purchase them online without having to visit the shop physically. Registered customers may place products of interest in a shopping cart, where it is presented as an order at checkout. This application was built with MongoDB, Express, React and Node.js. 

## Getting Started

* Also you can run the web app by running following commands in the react_app and express_server directory:
### `npm install`
### `npm start`
  -The MongoDB is hosted on Atlas DB. 

## How to use
#### General Usage:
+ To access the website:
    + Our project is deployed online at: [url]

+ To log in/sign up:
	+ Click on ``Login`` in the upper right corner in the navigation bar.
	+ Fill in email and password fields.
	+ Click ``Sign in``
  + If you do not have an account, click on ``Sign up`` on the same login page, and you will be directed to the sign up page. 
  + Fill in the first name, last name, email and password fields and click ``Sign Up``. You will then be redirected back to the login page, where you can use your newly created credentials to login.
	+ The navbar should be updated to show your first name once signed in. You should automatically be redirected to the home page, where you can select a product category(shoes/watches) and begin making purchases.
	+ Your login should be persistent, i.e. reloading the website or navigating to a different page should keep you logged in until you log out.
 

#### Admins:
> _Note:_ Admins are not able to make purchases.
+ To operate as an administrator:
	  + First make sure that you have logged in as admin. (Email: admin@gmail.com, Password: admin). 
    + Click on the profile Icon in the top right corner of the navigation bar, and select ``Profile``. You should see a table of registered users and their user details.
    + Click on the dustbin Icon to delete a user. This will erase all their user data from the database. Deleted users can no longer use their credentials to log in.
    + Select the drop down option for each user at the left of the table to see the purchases they have made over the course of their account history.
    + Navigate to the ``Add more Products`` at the top to begin adding a product(shoe/watch). Fill up the necessary fields such as name, description, price and category of the product. Also, upload an image of the product, and click on ``submit``. A successful message should be seen when you have correctly submitted a product. Return to the home page and select the category your new product is located in to see that it has been successfully added to the database. 
  
  
#### Registered Users:
+ To operate as a registered user:
    + First make sure that you have logged in. Mock test data credentials: Email: user@gmail.com  Password: user
    + Select a category(Shoes/Watches) to browse through various items. Click on details below each item to see the item's description. Click on ``add to Cart`` to add items that you are interested in into your shopping cart. 
    + To make a purchase, first click on the shopping cart icon at the top right corner of the navigation bar and click on ``checkout``, which will bring you to the checkout page. From there, you can review the items you wish to purchase and add/delete quantity of items by pressing on the ``+/-`` buttons. You may also choose to remove an item you do not want to purchase. Once you have decided, click on ``Buy It`` to confirm your purchase! 
    + Click on the profile Icon in the top right corner of the navigation bar, and select ``Profile``. You should be able to see your user details. 
    + Click on ``Edit Profile`` to edit your user information such as name, email and password. After doing so, you may use your new credentials to sign in.
    + Click on ``Become a premium member`` to become a premium member of the online store! You may now enjoy discounted price(50% off) for every product!
    + Click on ``Orders`` tab on the left side bar to see your order history. This will include all of the purchase orders you have made throughout the course of your account. 

 



## Regular Users 
* Otherwise you can register and login as regular users from the top right corner of home page
  - Users are able edit your user information such as name, email and so on 
  - Users can log out in our website from the top right corner of home page
  - Users can add products to shopping cart by clicking the "add to cart" option on each product 
  - Users can check out products directly from the shopping cart.


