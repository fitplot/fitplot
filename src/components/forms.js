import React from "react";
import clsx from "clsx";

function Label({ className, ...labelProps }) {
  return (
    <label
      {...labelProps}
      className={clsx(
        "inline-block text-gray-500 text-lg",
        className
      )}
    />
  );
}

const Input = React.forwardRef(function Input(props, ref) {
  const className = clsx(
    "placeholder-gray-500 focus-ring px-11 py-8 w-full text-black disabled:text-gray-400 text-lg font-medium bg-gray-100",
    props.className
  );

  if (props.type === "textarea") {
    return <textarea {...props} className={className} />;
  }

  return <input {...props} className={className} ref={ref} />;
});

export { Input, Label };
