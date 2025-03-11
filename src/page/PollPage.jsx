import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContext } from "../context/AppContext";

const PollPage = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [comment, setComment] = useState("");
  const { setDarkMode, darkMode } = useContext(AppContext);

  // Fetch poll data
  const fetchPoll = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/poll/${id}`
    );
    setPoll(res.data);
  };

  useEffect(() => {
    fetchPoll();
  }, [id]);

  // Handle voting
  const handleVote = async () => {
    if (selectedOption === null) return;
    await axios.put(`${import.meta.env.VITE_API_URL}/api/poll/${id}/vote`, {
      optionIndex: selectedOption,
    });
    fetchPoll();
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    await axios.put(`${import.meta.env.VITE_API_URL}/api/poll/${id}/comments`, {
      text: comment,
    });
    setComment("");
    fetchPoll();
  };

  if (!poll) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div
      className={`flex items-center justify-center  w-full transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <ToastContainer />

      {/* Poll Container */}
      <div
        className={`w-2xl relative py-10 mx-auto px-10 shadow-lg rounded-lg transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute cursor-pointer top-4 right-4"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        {/* Poll Question */}
        <h2 className="text-2xl font-bold mb-4">
          {" "}
          The Poll Question is:{" "}
          <span className="text-green-400">{poll.question}</span>
        </h2>

        {poll.resultsVisible ? (
          <>
            {" "}
            <div
              className={`mt-6 p-4 rounded-lg shadow-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
              }`}
            >
              <h3 className="font-bold mb-2">Poll Results</h3>
              {poll.options.map((opt, index) => (
                <div
                  key={index}
                  className="flex justify-between p-2 rounded-lg"
                >
                  <span>{opt.text}</span>
                  <span>{opt.votes} votes</span>
                </div>
              ))}
            </div>{" "}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={async () => {
                  await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/poll/${id}/like`
                  );
                  fetchPoll();
                }}
                className={`flex items-center cursor-pointer space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <span>👍</span>
                <span>{poll.likes}</span>
              </button>
              <button
                className={`flex items-center cursor-pointer space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <span>🔥</span>
                <span>{poll.trending}</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="space-y-2">
              {poll.options.map((opt, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all 
             ${
               selectedOption === index
                 ? "bg-blue-400 text-white shadow-lg"
                 : darkMode
                 ? "bg-gray-700 text-white hover:bg-gray-600"
                 : "bg-gray-100 text-black hover:bg-gray-200"
             }`}
                  onClick={() => setSelectedOption(index)}
                >
                  <input
                    type="radio"
                    name="poll"
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                    className="mr-3"
                  />
                  <label className="w-full flex justify-between">
                    {opt.text}
                    <span
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      } text-sm`}
                    ></span>
                  </label>
                </div>
              ))}
            </div>{" "}
            <button
              onClick={handleVote}
              className="bg-blue-500 text-white font-semibold p-3 rounded-lg w-full mt-4 hover:bg-blue-600 transition-all"
            >
              Vote
            </button>
          </>
        )}

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">Anonymous Comments</h3>
          <input
            type="text"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`w-full p-3 border rounded-lg transition-all ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-200"
            }`}
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-green-500 text-white p-3 rounded-lg w-full mt-2 hover:bg-green-600 transition-all"
          >
            Submit Comment
          </button>

          {/* Display Comments */}
          <div className="mt-10 space-y-2">
            {poll.comments.map((c, i) => (
              <div
                key={i}
                className={`p-3 border-b rounded-lg transition-all ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-200"
                }`}
              >
                {c.text}
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  {new Date(c.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reactions Section */}
      </div>
    </div>
  );
};

export default PollPage;
