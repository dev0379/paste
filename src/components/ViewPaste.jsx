import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);
  const copyRef = useRef(null);

  const handleCopy = () => {
    try {
      copyRef.current.setSelectionRange(0, 99999);
      copyRef.current.select();
      navigator.clipboard.writeText(paste.content);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy");
    }
  };

  if (!paste) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-error text-lg font-semibold">
          Paste not found.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body space-y-6">
          <h2 className="card-title text-2xl sm:text-3xl font-bold text-base-content">
            View Paste
          </h2>

          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text text-base-content">Title</span>
            </label>
            <input
              type="text"
              disabled
              value={paste.title}
              className="input input-bordered w-full"
            />
          </div>

          {/* Content Header with Copy Icon */}
          <div className="flex items-center justify-between">
            <label className="label mb-1">
              <span className="label-text text-base-content">Content</span>
            </label>
            <button
              className="btn btn-ghost btn-sm"
              title="Copy to clipboard"
              onClick={handleCopy}
            >
              <FiCopy className="text-lg" />
            </button>
          </div>

          {/* Content */}
          <div>
            <textarea
              ref={copyRef}
              value={paste.content}
              disabled
              className="textarea textarea-bordered w-full h-80 md:h-[450px] resize-none overflow-y-auto"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
