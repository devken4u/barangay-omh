function Hotlines() {
  return (
    <div className="border border-destructive rounded-md mb-4">
      <h1 className="text-3xl font-bold text-center bg-destructive text-background py-2">
        Hotlines
      </h1>
      <a
        href="/announcements"
        target="_blank"
        className="p-2 hover:bg-destructive hover:text-background block text-center font-bold"
      >
        View in new tab
      </a>
    </div>
  );
}

export default Hotlines;
