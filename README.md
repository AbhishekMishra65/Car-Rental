# Project Overview
## Regular User Flow
1) The system displays a list of cars that match the user’s search criteria.
2) Users can select a car from the list and specify the rental duration.
3) Once the rental duration is provided, the system generates a rental agreement containing
4) Users can view all their rental agreements in the “My Rental Agreements“ tab.
5) User can edit rental agreement details before accepting it.
6) Once the user accepts the rental agreement, it cannot be edited or deleted.
7) If the user wants to return the rented car, they can mark it as “request for return 

## Admin User Flow
1) Admin user can view all the rental agreements.
2) They have the authority to update or delete any rental agreement.
3) The admin user can validate all cars marked as “request for return” for conducting an 
inspection.
4) Once the inspection is completed, the admin can mark the car as returned.

## Admin credentials
Email : abhishek@gmail.com  
Password: abhishek

# How To Run This Project
## Running Backend
1) Open CarRental.API folder and then open .sln (solution) file in vscode 2022, the project is made using .NET 7 framework so make sure you have this version
2) open appsettings.json file and the change the server name in the connection string to your own ssms server name.
3) Then go to package manager console and type *Add-Migration* to run migration
4) Then after the build is succeeded, type *Update-Database* to apply migration to your newly created Database
5) After all the above steps press *cntrl + f5* or press run button to run the API

## Running Frontend
1) Open the CarRental.UI folder in vscode
2) In vscode terminal type *npm install* to install the packages mention in package.json file
3) After successfull installation of all the packages, in terminal type *ng serve* to run angular 



