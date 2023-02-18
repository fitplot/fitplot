import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export default function SetsTable({
  className,
  sets = [],
  isActionable = false,
  onAction,
}) {
  if (!sets || sets.length === 0) return null;

  return (
    <div className={clsx(className, 'flex flex-col divide-y')}>
      <div className='flex'>
        <HeadCell className='flex-1 py-3 px-6'>Volume</HeadCell>
        <HeadCell className='flex-1 py-3 px-6'>Amount</HeadCell>
        {isActionable ? <HeadCell className='w-10' /> : null}
      </div>
      {sets.map((set) => (
        <Set
          key={set.id}
          set={set}
          isActionable={isActionable}
          onAction={onAction}
        />
      ))}
    </div>
  );
}

function Set({ isActionable, onAction, set }) {
  const { volume, amount, unit } = set;

  const Container = isActionable
    ? ({ children, className, onActionFn }) => (
        <button
          type='button'
          className={clsx(className, 'text-left')}
          onClick={() => onActionFn(set)}
        >
          {children}
        </button>
      )
    : 'div';

  return (
    <Container onActionFn={onAction} className='flex'>
      <Cell className='flex-1 py-4 px-6'>{volume}</Cell>
      <Cell className='flex-1 py-4 px-6'>
        {amount ? `${amount} ${unit}` : null}
      </Cell>
      {isActionable ? (
        <Cell className='flex justify-center items-center w-10 h-full'>
          <EllipsisVerticalIcon className='inline-block w-6 h-6' />
        </Cell>
      ) : null}
    </Container>
  );
}

function HeadCell({ children, className }) {
  return (
    <div
      className={clsx(
        className,
        'text-xs font-medium text-slate-500 uppercase bg-slate-50'
      )}
    >
      {children}
    </div>
  );
}

function Cell({ children, className }) {
  return (
    <div
      className={clsx(className, 'text-sm font-medium text-slate-900 bg-white')}
    >
      {children}
    </div>
  );
}
