import RequestSession from "./RequestSession";

const RequestView = ({ sessions }) => {

  return (
    <div className="w-full h-full p-4 bg-zinc-900 rounded-lg">
      <h1 className="text-base font-bold text-white text-center p-1">
        Active Requests
      </h1>
      <div className="flex">
        {sessions.map((session) => (
          <RequestSession key={session.id} session={session} />
        ))}
        {sessions.length === 0 && (
          <div className="w-full text-white text-center p-4">
            No active interview requests, create one below
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestView;
