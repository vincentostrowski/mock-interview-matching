const RequestSession = ({ session }) => {
  return (
    <div className="h-full p-4 bg-gray-100 rounded-lg bg-zinc-800 text-white shadow-lg mx-1">
      <p>Topic: {session.topic}</p>
      <p>Ease: {session.ease}</p>
      <p>Type: {session.type}</p>
      <p>Time:</p>
    </div>
  );
};

export default RequestSession;
