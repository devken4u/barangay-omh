import PublicFooter from "./_components/PublicFooter";
import PublicHeader from "./_components/PublicHeader";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}

export default layout;
