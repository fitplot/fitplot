import { PencilIcon } from '@heroicons/react/24/outline';

import { modalId as GlobalCommandId } from '@/components/global-command';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import { useOpenable } from '@/hooks/openable';
import { useSelection } from '@/hooks/selection';

export default function SelectionPopover({ type }) {
  const [selection] = useSelection();

  const globalCommand = useOpenable(GlobalCommandId);

  return (
    <Popover open={selection.length > 0}>
      <PopoverContent className='flex w-72 flex-col items-center gap-4'>
        <div>
          <span className='text-sm text-muted-foreground'>
            {selection.length} {type || 'item'}(s) selected.
          </span>
        </div>
        <Button
          variant='outline'
          className='flex w-full gap-2'
          onClick={() => globalCommand.show({ type, data: selection })}
        >
          <PencilIcon className='h-4 w-4' />
          <span>Edit</span>
        </Button>
      </PopoverContent>
      <PopoverAnchor asChild>
        <div className='fixed bottom-[22px] left-0 right-0 flex' />
      </PopoverAnchor>
    </Popover>
  );
}
