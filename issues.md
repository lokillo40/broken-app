
# Issues Found in Starter Code

## 1. Missing Middleware for JSON Parsing

### Issue:
The application did not include any middleware to parse incoming JSON payloads in the requests. This resulted in `req.body` being `undefined`.

### Solution:
Added `express.json()` middleware to correctly parse incoming JSON payloads.

```javascript
app.use(express.json());
```

## 2. Asynchronous Handling

### Issue:
The original code attempted to use `async/await` within a `map()` function, resulting in an array of Promises, which were not being resolved correctly.

### Solution:
Used `Promise.all()` to wait for all the axios calls to be completed.

```javascript
const developersInfo = await Promise.all(req.body.developers.map(fetchGitHubUserInfo));
```

## 3. Error Handling

### Issue:
The error handler in the `catch` block referenced `err` which wasn't defined, leading to potential unhandled errors.

### Solution:
Refactored the error handling to correctly catch and handle errors. Additionally, implemented a custom error class `ExpressError` for more consistent error handling across the app.

```javascript
app.use((err, req, res, next) => {
  if (err instanceof ExpressError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

## 4. Lack of Comments and Organization

### Issue:
The starter code lacked comments and was not well-organized, making it hard to understand and maintain.

### Solution:
Refactored the code for better organization, added comments, and created helper functions to improve readability and maintainability.

---

### Additional Improvements:

- Centralized API URL for easier modifications.
- Added a startup message to indicate the server is running.
- Served static HTML files through Express.
