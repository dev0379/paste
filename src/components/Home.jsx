import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updatePaste } from "../redux/features/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  const createPaste = () => {
    const paste = {
      title: title,
      content: content,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setContent("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((item) => item._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setContent(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 space-y-4 bg-base-100 rounded-box shadow-md">
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="Paste Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full lg:flex-1"
          />
          <button
            type="submit"
            className="btn btn-primary w-full lg:w-auto"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create  Paste"}
          </button>
        </div>

        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full min-h-[450px]"
            placeholder="Paste your content here..."
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Home;
