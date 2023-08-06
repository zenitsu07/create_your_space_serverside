Create a cluster on mongodb cloud and install express, 
then we will use mongoose library of mongo db and setup our databse to connect t omongodb cloud

mongoose connect -> async function -> return promise
now while neting URL use env variables to store username and password

If connection is succesffull loo for console for messages of connected succesffult
Now create router folder to handle router endpoints of url's
route.js
Use express to handle

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Now call this router in index.js o handle diffferent routes of requests made from frontend

!!!!! CORS HELPS TO CONNECT REQUESTS FROM CLIENT SERVER TO BACKEND SERVER
!!!!! TO ADD APIS CHANGE THE CONFIG.JS FILE UNDER CONSTANTS

//////Login//////

//After succesful login we get Access and refresh tokens 
//Store with sessionStorage.setItem
//Use these details int he app by setting up context api

//Under !!!context-> DataProvider.jsx !!!
//Setup context and returns the DataContext.Provider where the returned fields are those variabkes whose states are required over the specific components
And for those components where we will use context of states of variables we will have to wrap those componets first

NEXT_STEP-> NOW to send the useraccoutn Details to user , We have to send setAccount() datat to user to be displayed in Home component for username, and given name

LOGIN->HOME


For image uoliad create api in cofig.js and use API from servcie calls 

TO post image to mongodb
create utils-> upload.js which act as middleware for the post ethod route of fileUpload in route.js

Used multer-gridfs-storage -> to store uploaded files directly to mongodb


