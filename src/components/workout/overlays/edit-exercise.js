import React from 'react';
import { useToggle } from 'react-use';

import Overlay from '../../overlay';
import SetsTable from '../components/sets-table';
import EditSet from './edit-set';

export default function EditExercise({ exercise, sets = [], open, onClose }) {
  const [showEditSet, toggleEditSet] = useToggle(false);
  const [activeSet, setActiveSet] = React.useState(null);

  const onCloseEditSet = () => {
    setActiveSet(null);
    toggleEditSet(false);
  };

  const onAction = (set) => {
    setActiveSet(set);
    toggleEditSet(true);
  };

  return (
    <>
      <Overlay open={open} onClose={onClose} title='Edit Set'>
        <div className='flex flex-col p-4'>
          <SetsTable
            className='border border-gray-200'
            sets={sets}
            isActionable
            onAction={onAction}
          />
        </div>
      </Overlay>
      <EditSet
        open={showEditSet}
        onClose={onCloseEditSet}
        exercise={exercise}
        set={activeSet}
      />
    </>
  );
}
