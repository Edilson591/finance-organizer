

type ButtonProps = {
  children: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonPrimary({
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`bg-primary border  font-bold  w-full  rounded-full border-1  transition-all delay-150 duration-300 ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
