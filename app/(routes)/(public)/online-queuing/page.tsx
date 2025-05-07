import QueueList from "./_components/QueueList";

function page() {
  return (
    <div className="p-8">
      <h1 className="font-bold text-xl mb-4">Barangay Queuing</h1>
      <QueueList />
    </div>
  );
}

export default page;
