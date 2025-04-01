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
    </div>
  );
}

export default layout;
