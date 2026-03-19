import { Link, LinkProps } from 'react-router-dom';
import React, { ReactNode } from 'react';

type ButtonProps = LinkProps & {
  children: ReactNode;
  className?: string;
  to: string;
};

export default function ButtonLink({
  children,
  to,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <Link
      to={to}
      className={`bg-primary border  font-bold  px-4 py-2 rounded-full border-1  transition-all delay-150 duration-300 ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
