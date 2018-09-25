![cf](https://i.imgur.com/7v5ASc8.png) Lab 08: HTTP Routing
======
#### Feature Tasks
* create the following directories to organize your code:
  * `src`
  * `src/lib`
  * `src/api`
  * `__test__`
* create an HTTP server using the native NodeJS `http` module
* create a custom parser module that:
  * uses promises to parse the JSON body of `POST` and `PUT` requests
  * uses the NodeJS `url` and `querystring` modules to parse the request url
* create a router constructor that allows you to register custom routes for `GET`, `POST`, `PUT`, and `DELETE` requests
* create a router constructor that handles requests to `GET`, `POST`, `PUT`, and `DELETE` using the custom routes defined

## Server Endpoints
### `/api/vi/notes`
PROOF OF LIFE endpoints, to prove server health

* `POST` request
 * pass data as stringifed JSON in the body of a **POST** request 
 * return a 200 response with the POST'd JSON as the content
* `PUT` request
 * pass `?id=<uuid>` as a query string parameter to identify a specific resource
  * pass data as stringifed JSON in the body of a **POST** request 
  * return a 200 response with the JSON as the content
* `GET` request
 * pass `?id=<uuid>` as a query string parameter to identify a specific resource
 * return a 200 response, and a message that states "ID: <id>" was requested
 * `DELETE` request
  * pass `?id=<uuid>` as a query string parameter to identify a specific resource
  * return a 200 response, and a message that states "ID: <id>" was deleted
  
## Tests
 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
 * `GET`: test 200, it should contain a response body for a request made with a valid id
 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `POST`: test 200, it should respond with the body content for a post request with a valid body
