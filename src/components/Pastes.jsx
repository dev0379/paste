import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPaste } from "../redux/features/pasteSlice";
import { Link } from "react-router-dom";
import { FiTrash2, FiEye, FiEdit, FiShare2, FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSharePasteId, setSelectedSharePasteId] = useState(null);

  const handleDelete = (id) => {
    dispatch(removeFromPaste(id));
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (id) => {
    document.getElementById("share_modal").showModal();
    setSelectedSharePasteId(id);
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied !");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const selectedPaste = pastes.find((p) => p._id === selectedSharePasteId);
  const shareUrl = selectedPaste
    ? `${window.location.origin}/pastes/${selectedPaste._id}`
    : "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search pastes..."
          className="input input-bordered w-full text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => (
            <div
              key={paste._id}
              className="bg-base-100 border border-base-300 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <h2 className="text-2xl font-semibold text-base-content break-words">
                  {paste.title}
                </h2>
                <div className="flex gap-3 text-lg">
                  <Link
                    to={`/pastes/${paste._id}`}
                    className="btn btn-sm btn-ghost"
                  >
                    <FiEye />
                  </Link>
                  <Link
                    to={`/?pasteId=${paste._id}`}
                    className="btn btn-sm btn-ghost"
                  >
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="btn btn-sm btn-ghost text-error"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => handleShare(paste._id)}
                    className="btn btn-sm btn-ghost"
                  >
                    <FiShare2 />
                  </button>
                </div>
              </div>

              {/* Paste Content */}
              <div className="bg-base-200 text-base-content/90 rounded-md p-4 whitespace-pre-wrap break-words text-sm md:text-base leading-relaxed max-w-[700px] max-h-[100px] overflow-hidden">
                {paste.content}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-base-content/60 text-lg">
            No pastes found.
          </div>
        )}

        <>
          {/* Share Modal */}
          <dialog id="share_modal" className="modal">
            <div className="modal-box space-y-4">
              <h3 className="font-bold text-xl text-base-content">
                Share Paste
              </h3>
              <p className="text-sm text-base-content/70">
                Use the link below to share this paste:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="input input-bordered w-full"
                />
                <button
                  onClick={() => handleCopy(shareUrl)}
                  className="btn btn-ghost tooltip"
                  data-tip="Copy link"
                >
                  <FiCopy />
                </button>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      </div>
    </div>
  );
};

export default Pastes;
