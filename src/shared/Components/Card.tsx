interface CardProps {
  children: React.ReactNode;
  className?: string; // 외부에서 추가적인 사이즈나 레이아웃 조정을 위해
}

export default function Card({ children, className }: CardProps) {
  return (
    <article
      className={`
      bg-white border border-gray-200 rounded-lg shadow-sm 
      overflow-hidden w-full h-full
      ${className} 
    `}
    >
      {children}
    </article>
  );
}
