import clsx from 'clsx';
import React from 'react';
import { useToggle } from 'react-use';

import { MarketingNavbar, InAppNavbar } from './navbar';
import SideBar from './sidebar';

export function MarketingLayout({ children, ...pageProps }) {
  return <MarketingPage {...pageProps}>{children}</MarketingPage>;
}

function MarketingPage({ children, user }) {
  return (
    <div className='flex h-full flex-col overflow-hidden overscroll-none break-words bg-white duration-200 ease-in'>
      <MarketingNavbar user={user} />
      <main className='flex flex-1 flex-col overflow-y-auto overscroll-none p-4'>
        {children}
      </main>
    </div>
  );
}

export function InAppLayout({ children, ...pageProps }) {
  return (
    <PageContextProvider>
      <InAppPage {...pageProps}>{children}</InAppPage>
    </PageContextProvider>
  );
}

function InAppPage({ children, user }) {
  const [isMenuToggled, toggleMenu] = useToggle();

  return (
    <>
      {Boolean(user) && <SideBar user={user} toggleMenu={() => toggleMenu()} />}
      <div
        className={clsx(
          'transition-translate flex h-full flex-col overflow-hidden overscroll-none break-words bg-white duration-200 ease-in',
          {
            'translate-x-3/4': isMenuToggled,
            'translate-x-0': !isMenuToggled,
          }
        )}
      >
        <InAppNavbar noop={Boolean(!user)} onToggleMenu={() => toggleMenu()} />
        <main className='flex flex-1 flex-col overflow-y-auto overscroll-none p-4'>
          {children}
        </main>
      </div>
    </>
  );
}

const INITIAL_PAGE_CONTEXT = {
  title: null,
  onMoreAction: null,
  withPageContext: null,
  resetPageContext: null,
};

const PageContext = React.createContext(INITIAL_PAGE_CONTEXT);

function PageContextProvider({ children }) {
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
