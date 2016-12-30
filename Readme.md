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

| Method | Url                  |Description                                          | Auth Level |
|--------|----------------------|-----------------------------------------------------|------------|
|GET     |`/api/v1/projects`    |Gets all projects                                    |Unauthorized|
|GET     |`/api/v1/projects/id` |Returns project of the specified id                  |Unauthorized|
|POST    |`/token`              |Returns a session token if the user is authenticated.| Authorized |
|POST    |`/api/v1/projects`    |Adds a new project to the database                   | Authorized |
|PATCH   |`/api/v1/projects/id` |Updates the project with a the designated id         | Authorized |
|DELETE  |`/api/v1/projects/id` |Removes the project from the database                | Authorized |


