export function Kbd({ children }) {
  return (
    <span className='flex font-sans bg-accent text-sm text-accent-foreground/50 w-5 h-5 px-[4px] items-center justify-center rounded'>
      {children}
    </span>
  );
}
