interface Props {
  className?: string;
  children: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({ children, className = "", disabled = false, onClick }: Props) {
  return (
    <button
      className={`${disabled ? "bg-gray-500 text-white" : "bg-primary text-on-primary"} transition-colors 
                  py-2.5 px-6 rounded-full text-label-large ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
