import { MouseEventHandler } from 'react';

interface SaveButtonProps {
  className?: string;
  onClick: MouseEventHandler<HTMLSpanElement>;
  saved?: boolean;
}

export function SaveButton({
  className = '',
  onClick,
  saved,
}: SaveButtonProps) {
  return (
    <span
      className={`w-fit text-xs bg-stone-100  px-2 py-1 rounded-full ml-2 absolute top-2 left-0 no-underline ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`size-4 ${saved ? 'fill-black' : ''}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
    </span>
  );
}
