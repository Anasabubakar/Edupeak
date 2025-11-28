

export default function CortexAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {children}
    </div>
  );
}
