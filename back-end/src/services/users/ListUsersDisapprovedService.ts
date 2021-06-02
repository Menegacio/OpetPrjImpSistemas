import { getRepository } from 'typeorm';

import User from '../../models/User';

class ListUsersDisapprovedService {
  public async execute(): Promise<User[]> {
    const userRepository = getRepository(User);

    const users = await userRepository.find({ where: { approved: false }});

    return users;
  }
}

export default ListUsersDisapprovedService;
