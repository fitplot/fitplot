import clsx from 'clsx';
import React from 'react';
import { useToggle } from 'react-use';

import SideBar from '../sidebar';
import TopBar from '../topbar';

export default function Page({ children, user }) {
  const [isMenuToggled, toggleMenu] = useToggle();

  return (
    <div className='h-full overflow-hidden overscroll-none'>
      {Boolean(user) && <SideBar user={user} toggleMenu={() => toggleMenu()} />}
      <div
        className={clsx(
          'flex h-full flex-col overflow-hidden overscroll-none break-words bg-gray-50 shadow-xl transition-transform duration-300 ease-in-out',
          {
            'translate-x-3/4': isMenuToggled,
            'translate-x-0': !isMenuToggled,
          },
        )}
      >
        <TopBar noop={Boolean(!user)} onToggleMenu={() => toggleMenu()} />
        <main className='flex flex-1 flex-col overflow-y-auto overscroll-none p-4'>
          {children}
        </main>
      </div>
    </div>
  );
}

const INITIAL_PAGE_CONTEXT = {
  title: null,
  onMoreAction: null,
  withPageContext: null,
  resetPageContext: null,
};

const PageContext = React.createContext(INITIAL_PAGE_CONTEXT);

export function PageContextProvider({ children }) {
  const [value, setValue] = React.useState(INITIAL_PAGE_CONTEXT);

  const set = React.useCallback(
    ({ title = null, onMoreAction = null } = {}) => {
      setValue({
        title,
        onMoreAction,
      });
    },
    [setValue],
  );

  const reset = React.useCallback(() => {
    set({
      title: null,
      onMoreAction: null,
    });
  }, [set]);

  const context = React.useMemo(
    () => ({
      title: value.title,
      onMoreAction: value.onMoreAction,
      set,
      reset,
    }),
    [set, reset, value],
  );

  return (
    <PageContext.Provider value={context}>{children}</PageContext.Provider>
  );
}

export const usePageContext = ({ title, onMoreAction }) => {
  const { set, reset } = React.useContext(PageContext);

  React.useEffect(() => {
    set({ title, onMoreAction });

    return () => {
      reset();
    };
  }, [set, reset, title, onMoreAction]);
};

export const usePageContextValues = () => {
  const { setPageContext, resetPageContext, ...context } =
    React.useContext(PageContext);
  return context;
};
