### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

Callbacks, promises, async/await.

- What is a Promise?

A promise represents a value that might not be available yet but will be at some point in the future.

- What are the differences between an async function and a regular function?

Async always returns a promise while a regular function returns the specified value directly. 

- What is the difference between Node.js and Express.js?

Node.js is a server-side JavaScript runtime, while Express.js is a web framework built on Node.js, simplifying web app and API development.

- What is the error-first callback pattern?

The error-first callback pattern in Node.js dictates that the first argument of a callback is an error object (or `null` if no error), followed by data arguments. It ensures consistent error handling in asynchronous operations. If an error occurs, it's returned first; otherwise, data follows.

- What is middleware?

Middleware is a function that runs between receiving a request and sending a response in web frameworks, handling tasks like logging, parsing, and authentication. It can modify requests and responses or pass control to the next function in line.

- What does the `next` function do?

The `next` function in middleware passes control to the next middleware or route handler in the sequence, ensuring chained processing of requests. If not called, the request-response cycle might hang.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

There's no error handling in place. If any of the requests fail, the entire function will throw an error. This could be addressed using try-catch blocks or other error-handling mechanisms.

The usernames are hardcoded in the function. This makes the function inflexible. Ideally, it should accept an array of usernames or URLs as arguments.

The variable names are specific to the usernames (elie, joel, matt). 

The requests are made sequentially. This means the second request will only start after the first one completes, and the third after the second completes. This increases the total time taken to fetch all users.