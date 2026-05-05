type ErrorStateProps = {
  title?: string;
  message: string;
};

export default function ErrorState({ title = "Error", message }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
      <p className="font-semibold">{title}</p>
      <p className="mt-1">{message}</p>
    </div>
  );
}
