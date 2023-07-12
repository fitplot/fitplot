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
        <Cell className='flex h-full w-10 items-center justify-center'>
          <EllipsisVerticalIcon className='inline-block h-6 w-6' />
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
        'bg-slate-50 text-xs font-medium uppercase text-slate-500',
      )}
    >
      {children}
    </div>
  );
}

function Cell({ children, className }) {
  return (
    <div
      className={clsx(
        className,
        'bg-slate-100 text-sm font-medium text-slate-900',
      )}
    >
      {children}
    </div>
  );
}
