import ScheduledItem from "./ScheduledItem";

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
        {mock.map((item) => (
          <ScheduledItem key={item.time} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ScheduledView;
