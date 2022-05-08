import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '../../types';
import { RootState } from '../../redux';
import { selectBox, orderBoxes } from '../../redux/actions/boxActions';
import styles from './BoxList.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const BoxList: React.FC = () => {
  const boxList = useSelector((state: RootState) => state.boxList.boxes);
  const selectedBox = useSelector(
    (state: RootState) => state.boxList.selectedBoxId
  );
  const dispatch = useDispatch();

  // const boxElements = boxList.map((box: Box) => ({
  //   box,
  //   onClick: onClick.bind(this, box),
  //   //linia de mai sus = onClick: () => {onClick(box); },
  // }));

  const boxElements = boxList.map((box: Box) => ({
    box,
    onClick: () => {
      if (box.id !== undefined) {
        dispatch(selectBox(box.id));
      }
    },
  }));

  const reorder = (list: Box[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onEnd = useCallback(
    (result) => {
      const reorderedList = reorder(
        boxList,
        result.source.index,
        result.destination.index
      );
      dispatch(orderBoxes(reorderedList));
    },
    [boxList]
  );

  return (
    <DragDropContext onDragEnd={onEnd}>
      <div className={styles.container}>
        <h3 className={styles.title}>Box List</h3>

        <Droppable droppableId="droppable-1" direction="horizontal">
          {/* or direction="horizontal" */}
          {(droppableProvided) => (
            <div
              className={styles.listContainer}
              ref={droppableProvided.innerRef}
            >
              {boxElements.map(
                (element: { box: Box; onClick: () => void }, index) => (
                  <Draggable
                    draggableId={element.box.id}
                    key={element.box.id}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <div
                        className={styles.boxContainer}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        {...draggableProvided.draggableProps}
                      >
                        <div
                          className={styles.box}
                          onClick={element.onClick}
                          //onClick={dispatch(selectBox)} - ce ai facut si mai sus doar ca in loc de bind ai dispatch
                          key={element.box.id}
                          style={{
                            border:
                              element.box.id === selectedBox
                                ? '3px solid chartreuse'
                                : 'none',
                            background: `rgb(${element.box.red}, ${element.box.green}, ${element.box.blue})`,
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              )}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default BoxList;
