# YelpCamp

A camping website with CRUD functionality , allowing users to share their camping experience.

Final Project of online course [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/4474078#questions)

### Techniques Used
Frontend: HTML / CSS / JavaScript + Bootstrap 4
Backend: Node.js / Express + MongoDB

### Frameworks & Middlewares

* **[Express](https://expressjs.com/)** is used for managing routes, handling requests and views.
* **[Mongoose](http://mongoosejs.com/)** is used for managing relationships between data, providing schema validation.
* **[Body-Parser](https://github.com/expressjs/body-parser/)** is used to parse the data that was received as a result of HTTP POST request.
* **[Passport.js](www.passportjs.org/)** is used to provide user authentication.
* **Embedded JavaScript** is used to embed the JavaScript within the HTML tags to implement the logic.

* Some other self-defined middlewares to improve the application such as:
	* to prevent unauthorised access to POST routes.
	* to check whether a user has logged in or not.
* Integrated **[Mapbox API](https://www.mapbox.com/)** to show exact position of the campgrounds.
* Added **Time created since** using **Moment.js**.

### RESTFUL Routes

#### Campground Routes

| Name    | Path                    | HTTP Verb | Purpose                                                 | Mongoose Method                |
| ------- | ----------------------- | --------- | ------------------------------------------------------- | ------------------------------ |
| Index   | `/campgrounds`          | GET       | List all campgrounds                                    | Campground.find()              |
| New     | `/campgrounds/new`      | GET       | Show a form to add new campground                       | N/A                            |
| Create  | `/campgrounds`          | POST      | Create a new campground                                 | Campground.create()            |
| Show    | `/campgrounds/:id`      | GET       | Show info about one specific campground                 | Campground.findById()          |
| Edit    | `/campgrounds/:id/edit` | GET       | Show edit form for one campground                       | Campground.findById()          |
| Update  | `/campgrounds/:id`      | PUT       | Update the chosen campground                            | Campground.findByIdAndUpdate() |
| Destroy | `/campgrounds/:id`      | DELETE    | Delete the chosen campground                            | Campground.findByIdAndRemove() |

#### Comment Routes

| Name    | Path                                         | HTTP Verb | Purpose                                                 | Mongoose Method             |
| ------- | -------------------------------------------- | --------- | ------------------------------------------------------- | --------------------------- |
| New     | `/campgrounds/:id/comments/new`              | GET       | Show a form to add a new comment                        | N/A                         |
| Create  | `/campgrounds/:id/comments/`                 | POST      | Create a new comment                                    | Comment.create()            |
| Edit    | `/campgrounds/:id/comments/:comment_id/edit` | GET       | Show edit form for one comment                          | Comment.findById()          |
| Update  | `/campgrounds/:id/comments/:comment_id`      | PUT       | Update the chosen comment                               | Comment.findByIdAndUpdate() |
| Delete  | `/campgrounds/:id/comments/:comment_id`      | DELETE    | Delete the chosen comment                               | Comment.findByIdAndRemove() |
