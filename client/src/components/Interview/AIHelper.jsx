const AIHelper = ({ session }) => {
  const user = localStorage.getItem("discordId");
  const isParticipant1 = user === session.participant1;
  /* const problem = isParticipant1 ? session.problem2 : sessionproblem1; */

  return <div className="flex-1 w-full bg-gray-500"></div>;
};

export default AIHelper;
