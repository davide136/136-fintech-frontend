export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: 'visa' | 'mastercard';
  amount: number;
}

export type CardDto = {
  _id: string,
  type: 'visa' | 'mastercard',
  name: string,
  surname: string,
  number: string,
  csc: number
};

export type MovementDto = {
  data: Movement[],
  total: number
}

export interface Movement {
  _id: string;
  type: 'in' | 'out';
  amount: number;
  title: string;
  description: string;
  cardId: string;
  timestamp: number;
}
