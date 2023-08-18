import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import _ from 'lodash';
import Head from 'next/head';
import { useIntersection } from 'react-use';

import { modalId as AddWorkoutDialogId } from '@/components/dialogs/add-workout-dialog';
import LoadingIcon from '@/components/loading-icon';
import Navbar from '@/components/navbar';
import SelectionPopover from '@/components/selection-popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { List, ListGroupLabel, ListItem } from '@/components/ui/list';
import { useOpenable } from '@/hooks/openable';
import { useSelection } from '@/hooks/selection';
import useWorkouts from '@/hooks/use-workouts';
import relative from '@/lib/date';
import withUser from '@/lib/with-user';

export default function WorkoutsPage() {
  const {
    data: workouts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useWorkouts();

  const columns = React.useMemo(
    () => [
      {
        id: 'selection',
        cell: ({ row }) =>
          row.getCanSelect() ? (
            <div className='inline-flex' onClick={(e) => e.preventDefault()}>
              <Checkbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  onCheckedChange: row.getToggleSelectedHandler(),
                }}
              />
            </div>
          ) : null,
      },
      {
        id: 'status',
        accessorFn: (original) =>
          Boolean(original.completedAt) ? 'Completed' : 'In Progress',
        cell: ({ row, getValue }) => (
          <span>{row.depth === 0 ? getValue() : null}</span>
        ),
      },
      {
        accessorKey: 'name',
        cell: ({ getValue }) => <span className='flex-1'>{getValue()}</span>,
      },
      {
        accessorKey: 'createdAt',
        cell: ({ row, getValue }) => (
          <span>{row.depth === 0 ? null : relative(getValue())}</span>
        ),
      },
    ],
    [],
  );

  const [, setSelection] = useSelection();
  const [rowSelection, setRowSelection] = React.useState([]);

  const grouping = React.useMemo(() => ['status'], []);
  const data = React.useMemo(() => workouts, [workouts]);
  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      grouping,
      expanded: true,
    },
    enableRowSelection: (row) => row.depth > 0,
    groupedColumnMode: false,
    debugAll: process.env.NODE_ENV === 'development',
  });

  React.useEffect(() => {
    if (table) {
      setSelection(table.getSelectedRowModel().flatRows.map((x) => x.original));
    }
    return () => setSelection([]);
  }, [rowSelection, setSelection, table]);

  const bottomOfListRef = React.useRef(null);
  const intersection = useIntersection(bottomOfListRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  React.useEffect(() => {
    if (
      !isLoading &&
      !isFetchingNextPage &&
      hasNextPage &&
      intersection &&
      intersection.intersectionRatio > 0
    ) {
      fetchNextPage();
    }
  }, [isLoading, isFetchingNextPage, hasNextPage, intersection, fetchNextPage]);

  const addWorkoutDialog = useOpenable(AddWorkoutDialogId);

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingIcon className='h-6 w-6' />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Workouts</title>
      </Head>
      <Navbar.Title>
        <span>Workouts</span>
      </Navbar.Title>
      <Navbar.RightContent>
        <Button
          size='sm'
          variant='primary'
          className='items-center gap-2'
          onClick={() => addWorkoutDialog.show()}
        >
          <PencilSquareIcon className='h-4 w-4' />
          <span>Workout</span>
        </Button>
      </Navbar.RightContent>
      <div className='mb-4 flex flex-1 flex-col'>
        <List>
          {table.getRowModel().rows.map((row) => {
            const Component = row.depth === 0 ? ListGroupLabel : ListItem;
            const props = {};
            if (row.depth > 0) {
              props.href = `/workout/${row.original.id}`;
            }

            return (
              <Component key={row.id} {...props}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <React.Fragment key={cell.key}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </React.Fragment>
                  );
                })}
              </Component>
            );
          })}
        </List>
        {/* Watch bottom of list for infinite scroll */}
        <div
          ref={bottomOfListRef}
          className={clsx({
            'border-b border-red-500': process.env.NODE_ENV !== 'production',
          })}
        />
        {isFetchingNextPage && (
          <LoadingIcon className='mt-2 h-4 w-4 self-center' />
        )}
      </div>
      <SelectionPopover type='workouts' />
    </>
  );
}

export const getServerSideProps = withUser();
