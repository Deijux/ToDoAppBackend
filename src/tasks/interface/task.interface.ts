import { User } from 'src/users/schemas/user.schema';

export interface Task {
  title: string;
  description?: string;
  completed: boolean;
  user: User;
}
