 export interface Task{
  id: number;
  name: string;
  description: string;
  priority: number;
  status: Status;
}
export enum Status{
  New = 'New',
  Active = 'Active',
  Closed = 'Closed'
}