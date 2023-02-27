import { Combobox } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import _ from 'lodash';
import React from 'react';

import { Input } from './forms';

export default function CustomCombobox({
  options,
  keyField = 'id',
  field,
  onAdd,
  onSelect,
}) {
  const [query, setQuery] = React.useState('');

  const filteredOptions = React.useMemo(
    () =>
      query
        ? options.filter((option) =>
            (field ? option[field] : option)
              .toLowerCase()
              .includes(query.toLowerCase())
          )
        : [],
    [options, query, field]
  );

  const hasExactMatch = React.useMemo(
    () =>
      options.some(
        (option) =>
          query.toLowerCase() === (field ? option[field] : option).toLowerCase()
      ),
    [options, query, field]
  );

  return (
    <Combobox>
      <Combobox.Input
        as={Input}
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(option) => (field ? option[field] : option)}
      />
      <Combobox.Options className='flex overflow-y-auto flex-col grow pt-2 pb-4 bg-slate-100 divide-y'>
        {filteredOptions.map((option) => (
          <Combobox.Option
            key={keyField ? option[keyField] : option}
            value={option}
            as='button'
            className='flex items-center p-2 bg-white'
            type='button'
            onClick={() => onSelect(option)}
          >
            <EllipsisVerticalIcon className='inline-block w-5 h-5 text-slate-500' />
            <span>{field ? option[field] : option}</span>
          </Combobox.Option>
        ))}
        {Boolean(onAdd) && query && !hasExactMatch && (
          <Combobox.Option
            as='button'
            type='button'
            onClick={() => onAdd(query)}
            className='flex items-center p-2 bg-white'
          >
            <EllipsisVerticalIcon className='inline-block w-5 h-5 text-slate-500' />
            <span className='pr-2 text-slate-500'>Create</span>
            <span>{query}</span>
          </Combobox.Option>
        )}
      </Combobox.Options>
    </Combobox>
  );
}
