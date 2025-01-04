import RequestItem from "./RequestItem";

const mock = [
  {
    ease: "Easy",
    topic: "Graphs",
    time: "12:00",
  },
  {
    ease: "Medium",
    topic: "Arrays",
    time: "1:00",
  },
  {
    ease: "Hard",
    topic: "Strings",
    time: "2:00",
  },
];

const RequestView = () => {
  return (
    <div className="w-full h-full p-4 bg-zinc-900 rounded-lg">
      <h1 className="text-base font-bold text-white text-center p-1">
        Active Requests
      </h1>
      <div className="flex">
        {mock.map((request, index) => (
          <RequestItem key={index} request={request} />
        ))}
      </div>
    </div>
  );
};

export default RequestView;
