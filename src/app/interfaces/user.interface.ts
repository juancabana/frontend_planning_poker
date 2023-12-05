export interface User {
  _id: string;
  username: string;
  room_id: string;
  visualization: Visualization;
  is_owner: boolean;
  is_connected: boolean;
  selected_card: number;
}

enum Visualization {
  "player",
  "spectator"
}
