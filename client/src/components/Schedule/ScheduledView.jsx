import ScheduledSession from "./ScheduledSession";

const ScheduledView = ({ sessions }) => {
  console.log("Scheduled: ", sessions);

  return (
    <div className="w-full h-full p-4 bg-zinc-900 rounded-lg">
      <h1 className="text-base font-bold text-white text-center p-1">
        Scheduled Interviews
      </h1>
      <div className="flex">
        {sessions.map((session) => (
          <ScheduledSession key={session.id} session={session} />
        ))}
        {sessions.length === 0 && (
          <div className="w-full text-white text-center p-4">
            No scheduled interviews, request or match one below
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledView;
