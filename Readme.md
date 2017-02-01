#Portfolio v2
a portfolio for the modren era.

##WHAT IS IT?
This is a basic portfolio app using [Flask](http://flask.pocoo.org/) as a backend and
[React.js](https://facebook.github.io/react/) as a frontend. It's intended to replace my other portfolio app.

##WHY DID YOU MAKE THIS?
No need to yell! My other portfolio is working great! It used Ruby on Rails, a very powerful backend that 
can do a lot of great things, but unfortunately It's already a little out of date. I intend to use this app to practice my
development skills in an entirely new language: Python! I'm also trying to try new development patterns, doing things with 
npm and gulp instead of manually and such.

##I heard that this thing has an API, is that true?
Yes, it does! I don't know why you'd need to access it, since it just stores all of the information for my projects and such, but 
it's pretty cool that it exists, right? 

Here are the currently available methods:

| Method | Route                       |Description                                          | Auth Level |
|--------|-----------------------------|-----------------------------------------------------|------------|
|GET     |`/api/v1/courses`            |Gets all courses                                     |Unauthorized|
|GET     |`/api/v1/courses/<course:id>`|Returns course of the specified id                   |Unauthorized|
|GET     |`/api/v1/courses/<course:id>/projects`|Returns all projects of a particular course.|Unauthorized|
|GET     |`/api/v1/courses/<course:id>/projects/<project:id>`|Returns a specific project.    |Unauthorized|
|GET     |`/api/v1/projects`           |Returns all projects, regardless of course           |Unauthorized|
|GET     |`/token`                     |Returns a session token if the user provides a token | Authorized |
|POST    |`/token`                     |Returns a session token if the user is authenticated.| Authorized |
|POST    |`/api/v1/projects`           |Adds a new project to the database                   | Authorized |
|PATCH   |`/api/v1/projects/id`        |Updates the project with a the designated id         | Authorized |
|DELETE  |`/api/v1/projects/id`        |Removes the project from the database                | Authorized |



### Special Parameters
Some resources also allow for certain parameters, specifically those which respond with multiple projects/courses/etc.

| Parameter | Expected value| Description |
|-----------|---------------|-------------|
|`limit`    |integer        |Upper limit of a query. `/api/v1/courses?limit=5` 
                              will only return the first five courses.|
|`offset`   |integer        |Lower limit of a query. `/api/v1/courses?offset=5` 
                             will only return courses after the fifth. Can be combined with limit.|
|`truncated`|boolean        |Returns a shortened version of the query, 
                             containing only the `name` and `id` of each item.|

