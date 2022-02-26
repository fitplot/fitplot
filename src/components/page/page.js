import clsx from 'clsx';
import React from 'react';
import { useToggle } from 'react-use';

import { useUser } from '../auth';
import Login from '../login';
import SideBar from '../sidebar';
import TopBar from '../topbar';

export default function Page({ children }) {
  const { user } = useUser();
  const [isMenuToggled, toggleMenu] = useToggle();

  return (
    <div className='overflow-hidden h-full'>
      <SideBar toggleMenu={() => toggleMenu()} />
      <div
        className={clsx(
          'flex overflow-hidden flex-col h-full break-words bg-white shadow-xl transition-transform duration-300 ease-in-out',
          {
            'translate-x-3/4': isMenuToggled,
            'translate-x-0': !isMenuToggled,
          }
        )}
      >
        <TopBar onToggleMenu={() => toggleMenu()} />
        <main className='flex overflow-y-auto overscroll-none flex-col flex-1 p-4'>
          {user ? children : <Login />}
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
    [setValue]
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
    [set, reset, value]
  );

  return <PageContext.Provider value={context}>{children}</PageContext.Provider>;
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
  const { setPageContext, resetPageContext, ...context } = React.useContext(PageContext);
  return context;
};
