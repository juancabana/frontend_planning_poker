export interface Card {
  id: number
  value: number;
  viewValue: string;
  selected: boolean;
  selected_by_user?: boolean;
}
