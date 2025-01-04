const RequestItem = ({ request }) => {
  return (
    <div className="h-full p-4 bg-gray-100 rounded-lg bg-zinc-800 text-white shadow-lg mx-1">
      <p>
        {request.topic} - {request.ease}
      </p>
      <p>{request.time}</p>
    </div>
  );
};

export default RequestItem;
