import { Router } from 'express';

import CreateUserService from '../services/users/CreateUserService';
import AuthenticateUserService from '../services/users/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, username, password, birth_date, course_id } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, username, password, birth_date, course_id });

  return response.json(user);
});

usersRouter.post('/login', async (request, response) => {
  const { username, password } = request.body;

  const autenticateUser = new AuthenticateUserService();

  const { user, token } = await autenticateUser.execute({ username, password });

  return response.json({ user, token });
});

export default usersRouter;