import { Box } from '../../types';
import { ActionType } from '../action-types';

export interface AddBoxAction {
  type: ActionType.addBox;
  payload: Box;
}

export interface SelectBoxAction {
  type: ActionType.selectBox;
  payload: string;
}

export interface EditBoxAction {
  type: ActionType.editBox;
  payload: Box;
}

export interface OrderBoxesAction {
  type: ActionType.orderBoxes;
  payload: Box[];
}

export const addBox = (box: Box): AddBoxAction => {
  return {
    type: ActionType.addBox,
    payload: box,
  };
};

export const selectBox = (id: string): SelectBoxAction => {
  return {
    type: ActionType.selectBox,
    payload: id,
  };
};

export const editBox = (box: Box): EditBoxAction => {
  return {
    type: ActionType.editBox,
    payload: box,
  };
};

export const orderBoxes = (boxes: Box[]): OrderBoxesAction => {
  return {
    type: ActionType.orderBoxes,
    payload: boxes,
  };
};
