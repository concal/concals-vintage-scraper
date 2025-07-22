export function LoadingWrapper({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  if (loading) {
    return (
      <div className="flex flex-col justify-center">
        <img src="./loading-spinner.svg" className="max-h-30" />
      </div>
    );
  }
  return <>{children}</>;
}
