import { Card } from "./card.interface";

export interface User {
  _id?: string;
  username: string;
  room_id: string;
  visualization: "player" |  "spectator";
  is_owner?: boolean;
  is_connected?: boolean;
  selected_card?: Card;
}

