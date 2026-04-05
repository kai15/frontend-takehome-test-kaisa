import express from 'express';
import getUsers from './api/users.js'; 
import getCourses from './api/courses.js';
import getComments from './api/comments.js';
import getFavorites from './api/favorites.js';
import getLogin from './api/login.js';
import uploadHandler from './api/upload.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.route('/api/users')
  .get(getUsers)
  .post(getUsers)
  .patch(getUsers);
app.get('/api/courses', getCourses);
app.route('/api/comments')
  .get(getComments)
  .post(getComments)
  .patch(getComments)
  .delete(getComments);
app.route('/api/favorites')
  .get(getFavorites)
  .post(getFavorites)
  .patch(getFavorites)
  .delete(getFavorites);
app.post('/api/login', getLogin);
app.post('/api/upload', uploadHandler);

app.listen(PORT, () => {
  console.log(`Backend dev server running at http://localhost:${PORT}`);
});