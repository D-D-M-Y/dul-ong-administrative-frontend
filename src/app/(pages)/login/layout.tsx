import '@/app/ui/global.css'

export default function Layout({children,}:
  { children: React.ReactNode }) {
  return (
      <div className="flex-grow md:overflow-y-auto bg-purple">{children}</div>
  );
}
