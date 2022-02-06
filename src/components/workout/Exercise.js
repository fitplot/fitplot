import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import _ from 'lodash';
import React, { useEffect } from 'react';

import Button from '../button';
import { Input } from '../forms';
import SetsView from './SetsView';

export default function Exercise({ exercise: { name } = {}, sets = [], isOpen, close }) {
  const [editedSets, setEditedSets] = React.useState();

  useEffect(() => {
    if (isOpen && !editedSets) {
      setEditedSets(_.clone(sets));
    }
  }, [isOpen, editedSets, sets]);

  /* eslint-disable-next-line no-console */
  const mutation = { mutateAsync: async (...messages) => console.log('submit', ...messages) };

  const submit = async () => {
    editedSets.forEach(async (editedSet) => {
      const ogSet = sets.find((s) => s.id === editedSet.id);
      if (!_.isEqual(ogSet, editedSet)) {
        // PUT edited set
        await mutation.mutateAsync(editedSet);
      }
    });
    close();
  };

  const onEditSet = (setId, changes) => {
    const index = sets.findIndex((set) => set.id === setId);
    if (index > -1) {
      const hotSet = editedSets[index];
      const changed = [
        ...editedSets.slice(0, index),
        { ...hotSet, ...changes },
        ...editedSets.slice(index + 1),
      ];
      setEditedSets(changed);
    }
  };

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} aria-label='View Exercise'>
      <DialogContent className='!w-screen md:!w-half-screen' aria-label='View Exercise'>
        <div className='flex flex-col space-y-2'>
          <Input className='py-2 px-4 bg-white' type='textarea' defaultValue={name} />
          <SetsView sets={editedSets} isEditable onEdit={onEditSet} />
          <div className='flex space-x-4'>
            <Button className='flex-1' onClick={() => close()}>
              <XIcon className='inline-block w-6 h-6' />
            </Button>
            <Button className='flex-1' onClick={() => submit()}>
              <CheckIcon className='inline-block w-6 h-6' />
            </Button>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
}
