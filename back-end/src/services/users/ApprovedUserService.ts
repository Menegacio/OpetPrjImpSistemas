import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface IRequest {
  user_id: string;
  approved: boolean;
}

class ApprovedUserService {
  public async execute({ user_id, approved }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id }});

    if (!user) {
      throw new AppError('User does not exist.');
    }

    user.approved = approved;

    await userRepository.save(user);

    return user;
  }
}

export default ApprovedUserService;
