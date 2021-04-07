import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Course from '../../models/Course';

class ListAllCoursesService {
  public async execute(): Promise<Course[]> {
    const courseRepository = getRepository(Course);

    const courses = await courseRepository.find();

    if (!courses) {
      throw new AppError('Cursos nao localizados.', 400);
    }

    return courses;
  }
}

export default ListAllCoursesService;