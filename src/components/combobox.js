import { Combobox } from '@headlessui/react';
import React from 'react';

import {
  ListMenu,
  ListMenuGroup,
  ListMenuItem,
  ListMenuTextInput,
} from './list-menu';

export const ComboboxDefault = {
  All: 'all',
  None: 'none',
};

export default function CustomCombobox({
  options,
  keyField = 'id',
  field,
  onAdd,
  onSelect,
  defaultFilter = ComboboxDefault.All,
  placeholder = null,
}) {
  const [query, setQuery] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    if (query) {
      return options.filter((option) =>
        (field ? option[field] : option)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    return defaultFilter === ComboboxDefault.All ? options : [];
  }, [options, query, field, defaultFilter]);

  const hasExactMatch = React.useMemo(
    () =>
      options.some(
        (option) =>
          query.toLowerCase() === (field ? option[field] : option).toLowerCase()
      ),
    [options, query, field]
  );

  return (
    <Combobox as={ListMenu} className='h-full'>
      <Combobox.Input
        as={ListMenuTextInput}
        placeholder={placeholder}
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(option) => (field ? option[field] : option)}
      />
      <Combobox.Options
        className='flex grow flex-col divide-y overflow-y-auto bg-slate-100 pt-2 pb-4'
        static={defaultFilter === ComboboxDefault.All}
      >
        <ListMenuGroup
          title={onAdd ? 'Select an option or create one' : 'Select an option'}
        >
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={keyField ? option[keyField] : option}
              value={option}
              as={ListMenuItem}
              onClick={() => onSelect(option)}
            >
              <span>{field ? option[field] : option}</span>
            </Combobox.Option>
          ))}
          {Boolean(onAdd) && query && !hasExactMatch && (
            <Combobox.Option as={ListMenuItem} onClick={() => onAdd(query)}>
              <span className='pr-2 text-slate-500'>Create</span>
              <span>{query}</span>
            </Combobox.Option>
          )}
        </ListMenuGroup>
      </Combobox.Options>
    </Combobox>
  );
}
