import { atom, useAtom } from 'jotai';

const selectionAtom = atom([]);
selectionAtom.debugLabel = 'SelectionAtom';

export function useSelection() {
  return useAtom(selectionAtom);
}
