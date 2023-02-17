import React from 'react';
import { useToggle } from 'react-use';

import { ListMenu, ListMenuGroup, ListMenuItem } from '../../list-menu';
import Overlay from '../../overlay';

export const WORKOUTS_ORDERBY = {
  Recent: {
    key: 'recent',
    label: 'Recent',
  },
  Name: {
    key: 'name',
    label: 'Name',
  },
};

export default function WorkoutsMoreActions({
  open,
  onClose,
  orderBy,
  setOrderBy,
  totalWorkouts,
}) {
  const [showSortOptions, toggleSortOptions] = useToggle(false);

  const submitSortOrder = (newOrderBy) => {
    setOrderBy(newOrderBy);
    toggleSortOptions(false);
  };

  return (
    <>
      <Overlay open={open} onClose={onClose} title='More Actions'>
        <ListMenu>
          <ListMenuGroup title='Sort By'>
            <ListMenuItem onClick={() => toggleSortOptions(true)}>
              {orderBy ? orderBy.label : 'None'}
            </ListMenuItem>
          </ListMenuGroup>
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
      <Overlay
        open={showSortOptions}
        onClose={() => toggleSortOptions(false)}
        title='Sort By'
      >
        <ListMenu>
          {Object.values(WORKOUTS_ORDERBY).map((item) => (
            <ListMenuItem key={item.key} onClick={() => submitSortOrder(item)}>
              {item.label}
            </ListMenuItem>
          ))}
        </ListMenu>
      </Overlay>
    </>
  );
}
