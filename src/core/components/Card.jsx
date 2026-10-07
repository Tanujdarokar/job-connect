import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border transition-all duration-200 ${
        glass
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-slate-200/80 dark:border-slate-800/80'
          : 'bg-white dark:bg-dark-900 border-slate-200 dark:border-slate-800'
      } ${
        hoverEffect
          ? 'hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700/60 hover:-translate-y-0.5 cursor-pointer'
          : 'shadow-sm'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
