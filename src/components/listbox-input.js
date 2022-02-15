import { DotsVerticalIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import React from 'react';

import { Input } from './forms';

export default function ListboxInput({
  options = [],
  onSelect,
  onSubmit,
  field = null,
  predicate,
  exactPredicate = () => _.identity,
  ...inputProps
}) {
  const [value, setValue] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState([]);
  const [hasExactMatch, setHasExactMatch] = React.useState(false);

  const onChange = (rawInput) => {
    setValue(rawInput.trim());
  };

  React.useEffect(() => {
    const filter = predicate || ((input) => (field ? _.matches({ [field]: input }) : _.identity));

    setFilteredOptions(() => (value ? options.filter(filter(value)) : []));
    setHasExactMatch(() => options.some(exactPredicate(value)));
  }, [value, exactPredicate, predicate, options, field]);

  return (
    <div className='flex flex-col space-y-2 h-full'>
      <div className='grow-0 shrink-0'>
        <Input onChange={(event) => onChange(event.target.value)} {...inputProps} />
      </div>
      <div className='flex overflow-y-auto flex-col grow pt-2 pb-4 bg-slate-100 divide-y'>
        <span className='py-3 px-6 text-xs font-medium tracking-wider text-slate-500 uppercase'>
          Select an exercise or create one
        </span>
        {filteredOptions.map((option) => (
          <ListboxOption
            displayValue={_.get(option, field, option)}
            onSelect={() => onSelect(option)}
          />
        ))}
        {!hasExactMatch && value && (
          <ListboxOption displayValue={value} onSelect={() => onSubmit(value)} isNew />
        )}
      </div>
    </div>
  );
}

function ListboxOption({ displayValue, onSelect, ...props }) {
  const isNew = Object.prototype.hasOwnProperty.call(props, 'isNew');

  return (
    <button type='button' className='flex items-center p-2 bg-white' onClick={onSelect}>
      {!isNew && <DotsVerticalIcon className='inline-block w-5 h-5 text-slate-500' />}
      {isNew && <span className='pr-2 text-slate-500'>Create</span>}
      <span className='font-medium'>{displayValue}</span>
    </button>
  );
}
