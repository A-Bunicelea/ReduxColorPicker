import { Box, Action } from '../../types';
import { ActionType } from '../action-types';

interface State {
  boxes: Box[];
  selectedBoxId: string;
}

const initialState: State = {
  boxes: [],
  selectedBoxId: '',
};

type BoxReducer = (state: State | undefined, action: Action) => State;

const boxReducer: BoxReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.addBox:
      return { ...state, boxes: [...state.boxes, action.payload] };

    case ActionType.selectBox:
      return { ...state, selectedBoxId: action.payload };

    case ActionType.editBox:
      const updatedBoxes: Box[] = [...state.boxes];
      const index: number = updatedBoxes.findIndex(
        (box: Box) => box === action.payload
      );
      if (index >= 0) {
        updatedBoxes.splice(index, 1, action.payload);
      }

      return { ...state, boxes: updatedBoxes };

    case ActionType.orderBoxes:
      return { ...state, boxes: action.payload };

    default:
      return state;
  }
};

export default boxReducer;
