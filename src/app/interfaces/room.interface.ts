import { User } from './user.interface';

export interface Room {
  _id: string;
  tittle: string;
  state?: State
  owner: string;
  averageScore: number;
  players: User[];
}

enum State {
  'active', 'inactive'
}
