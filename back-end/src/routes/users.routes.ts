import { Router } from 'express';

import CreateUserService from '../services/users/CreateUserService';
import AuthenticateUserService from '../services/users/AuthenticateUserService';
import ApprovedUserService from '../services/users/ApprovedUserService';
import ListUsersDisapprovedService from '../services/users/ListUsersDisapprovedService';
import DisapprovedUserService from '../services/users/DisapprovedUserService';

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

usersRouter.post('/approved', async (request, response) => {
  const { approved, user_id } = request.body;
    
  const approvedUserService = new ApprovedUserService();

  const user = await approvedUserService.execute({ approved, user_id});

  return response.status(200).json({ user });
});

usersRouter.get('/disapproved', async (request, response) => {
  const listUsersDisapproved = new ListUsersDisapprovedService();

  const users = await listUsersDisapproved.execute();

  return response.status(200).json({ users });
});

usersRouter.delete('/disapproved', async (request, response) => {
  const { id } = request.body;

  const disapprovedUser = new DisapprovedUserService();

  await disapprovedUser.execute({ user_id: id });

  return response.status(200).send();
});

export default usersRouter;