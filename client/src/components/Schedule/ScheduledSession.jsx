import { useState } from "react";
import edit from "../../assets/edit.png";
import ScheduledEditModal from "./ScheduledEditModal";

const ScheduledSession = ({ session }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = (e) => {
    setShowModal(false);
    e.stopPropagation();
  };

  return (
    <div
      className="h-full p-4 bg-gray-100 rounded-lg bg-zinc-800 text-white shadow-lg mx-1 hover:brightness-75 group cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      <p>Topic: {session.topic}</p>
      <p>Ease: {session.ease}</p>
      <p>Type: {session.type}</p>
      <p>
        Partner:{" "}
        {localStorage.getItem("discordId") === session.participant1.discordId
          ? session.participant2.discordId
          : session.participant1.discordId}
      </p>
      <p>Time:</p>
      <img
        src={edit}
        alt="edit"
        className="hidden group-hover:block absolute bottom-2 right-2 w-6 h-6 cursor-pointer"
      />
      {showModal && (
        <ScheduledEditModal
          handleClose={(e) => handleClose(e)}
          session={session}
        />
      )}
    </div>
  );
};

export default ScheduledSession;
