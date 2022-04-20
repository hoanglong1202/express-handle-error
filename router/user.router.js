const express = require('express');
const router = express.Router();

router.get('/users', (req, res, next) => {
  res.send('Get User List');
});

router.post('/users', (req, res, next) => {
  res.send('POST User List');
});

router.patch('/users/id', (req, res, next) => {
  res.send('Update Single User');
});

router.delete('/users/id', (req, res, next) => {
  res.send('Delete Single User');
});

module.exports = router;
