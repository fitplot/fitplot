import clsx from 'clsx';

const variants = {
  default: 'text-blue-800 bg-blue-50',
  success: 'text-green-800 bg-green-50',
  warn: 'text-yellow-800 bg-yellow-50',
};

export default function InfoCard({
  children,
  className,
  variant = 'default',
  ...props
}) {
  const style = variants[variant];

  return (
    <div
      className={clsx(
        'flex items-center p-4 mb-4 text-sm rounded-lg',
        style,
        className,
      )}
      role='alert'
      {...props}
    >
      {children}
    </div>
  );
}
