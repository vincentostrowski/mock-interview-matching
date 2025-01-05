import ScheduledSession from "./ScheduledSession";

const mock = [
  {
    ease: "Easy",
    topic: "Graphs",
    partner: "john23x",
    time: "12:00",
    john23x: "Set Problem",
    vincentost778: "Rotten Oranges",
  },
  {
    ease: "Medium",
    topic: "Arrays",
    partner: "vincentost778",
    time: "1:00",
    john23x: "Set Problem",
    vincentost778: "Rotten Oranges",
  },
  {
    ease: "Hard",
    topic: "Strings",
    partner: "john23x",
    time: "2:00",
    john23x: "Set Problem",
    vincentost778: "Rotten Oranges",
  },
];

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
