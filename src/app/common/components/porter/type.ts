export type PorterType = {
  id: number;
  image: string;
  title: string;
  description: string;
  date: Date;
  editable?: boolean;
  deleteItem?: () => void
}