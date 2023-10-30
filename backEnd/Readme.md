# Todo Application..

- We need to have a personal ID for a person using the todo so whenever the person loggs in they will be able to use their own Tasks  
- When the user enters they will have an option to create a task
- Then we need him to create a **Title** using the option
- After that user can create a **Task**, saving the task will save it to the database
- That task will have two options; **Edit** & **Remove**




> An error got me stuck when on creating the new user i was getting: `ERROR: E11000 duplicate key error collection: todoApp.users index: username_1 dup key: { username: null }` which clearly means the `username_1` was already there and so, new index was not being created for the new user...
![](./fixing%20user.png)
> Your collection has a extra index named username_1 which is causing this error. When you already have 1 document in your collection with that parameter `(username_1)` as null, mongodb does not allow to add one more document after that with the same paramter as null (which you are doing without knowing). **How to fix it?** You need to delete the index named username_1 from your collection. If you are using MongoDBCompass, go to Indexes and delete the index named username_1. [this i got from the stackoverflow]




https://excalidraw.com/#json=Gx0aey25xY-cf-u_Hlgw2,nIGdNT0WscrwXbyH6d4Neg
