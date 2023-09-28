const express = require('express');
const axios = require('axios');
const ExpressError = require('./expressError');

const app = express();
const GITHUB_API_URL = 'https://api.github.com/users/';

app.use(express.json());


// Fetch data about a single GitHub user
async function fetchGitHubUserInfo(username) {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${username}`);
    return {
      name: response.data.name,
      bio: response.data.bio
    };
  } catch (err) {
    throw new ExpressError(`Error fetching data for user: ${username}`, 400);
  }
}

app.post('/', async (req, res, next) => {
  try {
    const developersInfo = await Promise.all(req.body.developers.map(fetchGitHubUserInfo));
    res.json(developersInfo);
  } catch (err) {
    next(err);
  }
});

// Centralized error handling
app.use((err, req, res, next) => {
  if (err instanceof ExpressError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
