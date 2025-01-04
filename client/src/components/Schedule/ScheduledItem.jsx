//For each scheudled interview, should be able to set the problem, the time, wehther to cancel
//Should see the person it's with

const ScheduledItem = ({ item }) => {
  return (
    <div className="h-full p-4 bg-gray-100 rounded-lg bg-zinc-800 text-white shadow-lg mx-1">
      <p>
        {item.topic} - {item.ease}
      </p>
      <p>{item.time}</p>
      <p>{item.partner}</p>
    </div>
  );
};

export default ScheduledItem;
