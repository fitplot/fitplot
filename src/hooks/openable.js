import React from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const registryAtom = atom({});
registryAtom.debugLabel = 'OpenableRegistryAtom';

function createOpenableAtom(key) {
  const openableAtom = atom({ open: false, data: null });
  openableAtom.debugLabel = `OpenableModelAtom${key}`;
  return openableAtom;
}

export function useOpenable(key) {
  const registry = useAtomValue(registryAtom);

  const openableAtom = React.useMemo(
    () =>
      console.log('looking up openable', key) ||
      registry[key] ||
      (registry[key] = createOpenableAtom(key)),
    [registry, key]
  );

  const update = useSetAtom(openableAtom);

  const show = React.useCallback(
    (data) =>
      update((previous) => ({ open: true, data: data ?? previous.data })),
    [update]
  );

  const hide = React.useCallback(
    () => update(() => ({ open: false, data: null })),
    [update]
  );

  return { show, hide };
}

export function useOpenableModel(key) {
  const registry = useAtomValue(registryAtom);

  const openableAtom = React.useMemo(
    () =>
      console.log('looking up openable model', key) ||
      registry[key] ||
      (registry[key] = createOpenableAtom(key)),
    [registry, key]
  );

  const [openable, update] = useAtom(openableAtom);

  const toggle = React.useCallback(
    (value) =>
      update((previous) => ({ ...previous, open: value ?? !previous.open })),
    [update]
  );

  return { ...openable, toggle };
}
