import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
    setPoll(res?.data);
  };

  useEffect(() => {
    fetchPoll();
  }, [id]);

  // Handle voting
  const handleVote = async () => {
    if (selectedOption === null) {
      toast.warn("Please select an option before voting!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/poll/${id}/vote`, {
        optionIndex: selectedOption,
      });

      toast.success("Vote submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });

      fetchPoll(); // Refresh poll data
    } catch (error) {
      toast.error("Failed to submit vote. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
      console.error("Voting error:", error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (comment === "") {
      toast.warn("Please write comment!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
      return;
    }
    if (!comment.trim()) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/poll/${id}/comments`,
        {
          text: comment,
        }
      );

      setComment("");
      fetchPoll();

      toast.success("Comment submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    } catch (error) {
      console.error("Error submitting comment:", error);

      toast.error("Failed to submit comment. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  const handleLikeReact = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/poll/${id}/like`);
      fetchPoll();

      toast.success("Like submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light", // Fixed theme format
      });
    } catch (error) {
      console.error("Error submitting like:", error);
      toast.error("Failed to submit like. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  const handleTrendingReact = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/poll/${id}/trending`
      );
      fetchPoll();

      toast.success("Like submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light", // Fixed theme format
      });
    } catch (error) {
      console.error("Error submitting like:", error);
      toast.error("Failed to submit like. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  if (!poll)
    return (
      <p
        className={`flex text-center items-center justify-center  h-screen   mt-4 w-full transition-colors ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        Loading...
      </p>
    );

  return (
    <div
      className={`flex items-center justify-center min-h-screen w-full transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <ToastContainer />

      {/* Poll Container */}
      <div
        className={`w-full max-w-2xl mx-4 md:mx-auto p-4 md:p-6 lg:p-8 shadow-lg rounded-lg transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute cursor-pointer top-4 right-4"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Poll Question */}
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          The Poll Question is:{" "}
          <span className="text-green-400">{poll.question}</span>
        </h2>

        {poll.resultsVisible ? (
          <>
            {/* Poll Results */}
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
            </div>

            {/* Reactions Section */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => handleLikeReact()}
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
                onClick={() => handleTrendingReact()}
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
            {/* Poll Options */}
            <div className="space-y-2">
              {poll.options.map((opt, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
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
            </div>

            {/* Reactions Section */}
            <div className="mt-3 mb-6 flex justify-end space-x-4">
              <button
                onClick={() => handleLikeReact()}
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
                onClick={() => handleTrendingReact()}
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

            {/* Vote Button */}
            <button
              onClick={handleVote}
              className="bg-blue-500 text-white cursor-pointer font-semibold p-3 rounded-lg w-full mt-4 hover:bg-blue-600 transition-all"
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
            className="bg-green-500 text-white p-3 cursor-pointer rounded-lg w-full mt-2 hover:bg-green-600 transition-all"
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
      </div>
    </div>
  );
};

export default PollPage;
