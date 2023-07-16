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
        'mb-4 flex items-center rounded-lg p-4 text-sm',
        style,
        className
      )}
      role='alert'
      {...props}
    >
      {children}
    </div>
  );
}
