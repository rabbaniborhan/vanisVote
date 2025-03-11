import axios from "axios";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AppContext } from "../context/AppContext";

const CreatePoll = () => {
  const { setDarkMode, darkMode } = useContext(AppContext);
  const [question, setQuestion] = useState("");
  const [pollType, setPollType] = useState("yes-no");
  const [options, setOptions] = useState(["", ""]);
  const [expiresIn, setExpiresIn] = useState(1);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [copyButton, setCopyButoon] = useState(false);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const pollData = {
      question,
      type: pollType,
      options:
        pollType === "yesno"
          ? ["Yes", "No"]
          : options.filter((opt) => opt.trim() !== ""),
      expiresIn,
      resultsVisible: true,
    };
    console.log(pollData);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-poll`,
        pollData
      );

      if (res.data.id) {
        toast.success("Poll created successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
        setQuestion("");
        setOptions(["", ""]);
        setLoading(false);
        const pollLink = `${window.location.origin}/poll/${res?.data?.id}`;
        setCopyButoon(true);
        setLink(pollLink);
      }
    } catch (error) {
      console.error("Error creating poll:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
        setLink("");
        setCopyButoon(false);
      })
      .catch((err) => {
        toast.error("Failed to copy link: ", err);
      });
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen mt-4 h-screen w-full px-4 sm:px-6 md:px-8 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <ToastContainer />
      <div
        className={`max-w-lg w-full relative py-8 sm:py-10 md:py-12 px-6 sm:px-8 md:px-10 shadow-lg rounded-lg transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
          Create a Poll
        </h2>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute cursor-pointer top-4 right-4"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <form onSubmit={handleSubmit}>
          {/* Question Input */}
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={`w-full p-3 border rounded mb-4 text-base sm:text-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            required={!copyButton}
          />

          {/* Poll Type Selection */}
          <div className="mb-4">
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                value="yes-no"
                checked={pollType === "yes-no"}
                onChange={() => setPollType("yes-no")}
                className="mr-1"
              />
              Yes/No
            </label>
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                value="multiple-choice"
                checked={pollType === "multiple-choice"}
                onChange={() => setPollType("multiple-choice")}
                className="mr-1"
              />
              Multiple Choice
            </label>
          </div>

          {/* Multiple Choice Options */}
          {pollType === "multiple-choice" && (
            <div className="mb-4">
              {options.map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={opt}
                  required
                  onChange={(e) => updateOption(index, e.target.value)}
                  className={`w-full p-3 border rounded mb-3 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                />
              ))}
              <button
                type="button"
                onClick={addOption}
                className="text-blue-500 cursor-pointer text-sm sm:text-base"
              >
                + Add Option
              </button>
            </div>
          )}

          {/* Expiration Time Selection */}
          <label className="block mb-3 text-base sm:text-lg">
            Poll Expiration:
          </label>
          <select
            value={expiresIn}
            onChange={(e) => setExpiresIn(Number(e.target.value))}
            className={`w-full p-3 border cursor-pointer rounded mb-4 text-base sm:text-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="1">1 Hour</option>
            <option value="12">12 Hours</option>
            <option value="24">24 Hours</option>
          </select>

          {/* Submit Button */}
          {copyButton ? (
            <></>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 cursor-pointer text-white px-4 py-3 rounded w-full text-lg sm:text-xl"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Poll"}
            </button>
          )}
        </form>

        {copyButton && (
          <button
            onClick={() => handleCopyLink()}
            className="bg-green-500 cursor-pointer text-white px-4 py-3 rounded w-full text-lg sm:text-xl mt-2"
          >
            Copy Link
          </button>
        )}
      </div>
    </div>
  );
};
export default CreatePoll;
