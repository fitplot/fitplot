export function Kbd({ children }) {
  return (
    <span className='flex font-sans bg-accent text-accent-foreground/50 w-6 h-6 px-[4px] items-center justify-center rounded'>
      {children}
    </span>
  );
}
