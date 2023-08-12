import React from 'react';
import {
  ClipboardIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AddSetsDialogId } from '@/components/dialogs/add-sets-dialog';
import LoadingIcon from '@/components/loading-icon';
import Navbar from '@/components/navbar';
import SelectionPopover from '@/components/selection-popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { List, ListGroupLabel, ListItem } from '@/components/ui/list';
import WorkoutMoreActions from '@/components/workout-more-actions';
import { useOpenable } from '@/hooks/openable';
import { useSelection } from '@/hooks/selection';
import { useSets } from '@/hooks/use-sets';
import { useWorkout } from '@/hooks/use-workout';
import fitcode from '@/lib/fitcode';
import withUser from '@/lib/with-user';

export default function WorkoutPage() {
  const router = useRouter();
  const { workoutId } = router.query;

  const defaultData = React.useMemo(() => [], []);

  const { data: workout, isLoading: isLoadingWorkout } = useWorkout(workoutId);
  const { data: sets, isLoading: isLoadingSets } = useSets(workoutId);

  const columns = React.useMemo(
    () => [
      {
        id: 'selection',
        cell: ({ row }) =>
          row.depth === 0 ? (
            <div className='inline-flex' onClick={(e) => e.preventDefault()}>
              <Checkbox
                {...{
                  checked:
                    row.getIsSelected() ||
                    (row.getIsAllSubRowsSelected() && 'indeterminate'),
                  disabled: !row.getCanSelect(),
                  onCheckedChange: row.getToggleSelectedHandler(),
                }}
              />
            </div>
          ) : (
            <div className='inline-flex' onClick={(e) => e.preventDefault()}>
              <Checkbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  onCheckedChange: row.getToggleSelectedHandler(),
                }}
              />
            </div>
          ),
      },
      {
        id: 'exercise',
        accessorFn: (original) => original.exercise.name,
        cell: ({ row, getValue }) =>
          row.depth === 0 && <span className='flex-1'>{getValue()}</span>,
        getGroupingValue: (original) => original.exercise.id,
      },
      {
        id: 'fitcode',
        accessorFn: (original) => fitcode.from(original),
        cell: ({ row, getValue }) => row.depth > 0 && <span>{getValue()}</span>,
      },
      {
        id: 'unit',
        accessorFn: (original) => original.unit.delimiter,
        cell: ({ row, getValue }) =>
          row.depth > 0 && <span className='flex-1'>{getValue()}</span>,
      },
      {
        id: 'item-actions',
        cell: ({ row }) => {
          if (row.depth === 0) return null;

          const code = fitcode.from(row.original);

          return (
            <DropdownMenu>
              <ListItem>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='float-right h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <EllipsisHorizontalIcon className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>{code}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(code)}
                  >
                    <ClipboardIcon className='h-4 w-4 mr-2' />
                    Copy FitCode&trade;
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-destructive-500'>
                    <TrashIcon className='h-4 w-4 mr-2' />
                    Delete this set
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </ListItem>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const grouping = React.useMemo(() => ['exercise'], []);

  const [, setSelection] = useSelection();
  const [rowSelection, setRowSelection] = React.useState([]);

  const data = React.useMemo(() => sets, [sets]);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSubRowSelection: true,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      grouping,
      expanded: true,
    },
    groupedColumnMode: false,
    debugAll: process.env.NODE_ENV === 'development',
  });

  React.useEffect(() => {
    if (table) {
      setSelection(table.getSelectedRowModel().flatRows.map((x) => x.original));
    }
    return () => setSelection([]);
  }, [rowSelection, setSelection, table]);

  const name = workout && workout.name;
  const completedAt = workout && workout.completedAt;
  const isCompleted = Boolean(completedAt);

  const isLoading = isLoadingWorkout || isLoadingSets;

  const addSetsDialog = useOpenable(AddSetsDialogId);

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <LoadingIcon className='w-6 h-6' />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{name || 'Workout'}</title>
      </Head>
      <Navbar.Title>
        <span className='truncate'>{name || 'Workout'}</span>
        <WorkoutMoreActions workout={workout} />
      </Navbar.Title>
      <Navbar.RightContent>
        <div className='flex gap-2 items-center'>
          {!isCompleted && (
            <Button
              size='sm'
              variant='primary'
              className='items-center gap-2'
              onClick={() => addSetsDialog.show({ workout })}
            >
              <PlusIcon className='w-4 h-4' />
              <span>Exercise</span>
            </Button>
          )}
        </div>
      </Navbar.RightContent>
      <div className='flex flex-1 flex-col mb-4 -mx-4'>
        <List>
          {table.getRowModel().rows.map((row) => {
            const Component = row.depth === 0 ? ListGroupLabel : ListItem;

            return (
              <Component key={row.id}>
                {row.getAllCells().map((cell) => {
                  return (
                    <React.Fragment key={cell.key}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </React.Fragment>
                  );
                })}
              </Component>
            );
          })}
        </List>
      </div>
      <SelectionPopover type='set' />
    </>
  );
}

export const getServerSideProps = withUser();
