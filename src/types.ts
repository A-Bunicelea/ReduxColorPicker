import {
  AddBoxAction,
  EditBoxAction,
  SelectBoxAction,
  OrderBoxesAction,
} from './redux/actions/boxActions';

export interface Box {
  // id: string | undefined;
  id: string;
  red: number | string;
  green: number | string;
  blue: number | string;
  creationTime: string;
}

export interface BoxColors {
  red: number | string;
  green: number | string;
  blue: number | string;
}

export type Action =
  | AddBoxAction
  | SelectBoxAction
  | EditBoxAction
  | OrderBoxesAction;

export type GenerateRandomColor = () => void;
