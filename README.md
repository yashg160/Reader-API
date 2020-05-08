# Reader API

Reader API written with Node.js and Express.js, using MySQL as database. 

**Note: The project is an unusable state right now as there is an unavailability of the correct version of MySQL. Here is a list of all routes in the API and their responses**

**Visit project at https://yashg160.github.io/Reader**

#### Base Route
- / : Index router. Returns a message.
---

#### Users Route
- /users/: Returns the user using the userId
- /users/writtenArticles: Returns a list of all the articles written by the provided user.
- /users/signin: Signs the user in using the email id and password
- /users/logout: Logs the user out
- /users/signup: Creates a new account, if it doesn't already exist
- /users/update: Updates the user's details such as password, avatar and name.
---

#### Article Route
- /article/: Returns an article using its articleId
- /artcile/new: Creates a new article
- /article/forUser: Returns references to all the articles written by a user.