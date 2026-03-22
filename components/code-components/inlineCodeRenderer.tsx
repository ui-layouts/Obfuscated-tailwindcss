export function InlineCodeRenderer({
  className,
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={`px-1 py-0.5 bg-primary/5 text-primary/70 font-mono rounded text-sm not-prose ${className}`}
    >
      {children}
    </code>
  );
}
