import { Router } from 'express';

import ListAllCoursesService from '../services/course/ListAllCoursesService';

const coursesRouter = Router();

coursesRouter.get('/', async (request, response) => {
  const listCourses = new ListAllCoursesService();

  const courses = await listCourses.execute();

  return response.json(courses);
});

export default coursesRouter;