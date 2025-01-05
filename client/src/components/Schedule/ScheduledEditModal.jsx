import ReactDOM from "react-dom";
import { useState } from "react";

const RequestEditModal = ({ handleClose, session }) => {
  const [formData, setFormData] = useState({
    topic: session?.topic || "",
    ease: session?.ease || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    handleClose();
  };

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-2/3 p-6 z-50">
        <h3 className="text-xl font-semibold mb-4">Edit Session Request</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Topic</label>
            <input
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ease</label>
            <select
              name="ease"
              value={formData.ease}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="one-on-one">Guided</option>
              <option value="group">Non-Guided</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default RequestEditModal;
