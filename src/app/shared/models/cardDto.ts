export interface CardDto {
  _id: string;
  ownerId: string;
  owner: string;
  name: string;
  surname: string;
  amount: number;
  number: string;
  type: 'visa' | 'mastercard';
  code: string;
}
