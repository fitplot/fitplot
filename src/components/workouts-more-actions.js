import React from 'react';

import { ListMenu, ListMenuGroup, ListMenuItem } from '@/components/list-menu';
import Overlay from '@/components/overlay';

export default function WorkoutsMoreActions({ open, onClose, totalWorkouts }) {
  return (
    <Overlay open={open} onClose={onClose} title='More Actions'>
      <ListMenu>
        {totalWorkouts !== undefined && (
          <ListMenuGroup>
            <ListMenuItem className='text-slate-500'>
              <div>Total Workouts</div>
              <div className='ml-auto'>{totalWorkouts}</div>
            </ListMenuItem>
          </ListMenuGroup>
        )}
      </ListMenu>
    </Overlay>
  );
}
