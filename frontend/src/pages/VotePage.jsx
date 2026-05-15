import { useEffect, useState } from "react";
import API from "../api/api";

export default function VotePage() 
{
  const [nominees, setNominees] = useState([]);
  const [selectedNominee, setSelectedNominee] = useState("");
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(
    sessionStorage.getItem("hasVoted") === "true"
  );

  const getNominees = async () => {
    try {
      const res = await API.get("/nominees");

      if (res.data.success) {
        setNominees(res.data.nominees);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("sessionId", sessionId);
    }

    return sessionId;
  };

  const submitVote = async () => {
    if (!selectedNominee) {
      setMessage("Please select a nominee");
      return;
    }

    try {
      const res = await API.post("/votes", {
        nominee_id: selectedNominee,
        session_id: getSessionId(),
      });

      if (res.data.success) {
        sessionStorage.setItem("hasVoted", "true");
        setHasVoted(true);
        setMessage("Your vote has been submitted successfully");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    getNominees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Online Live Polling
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Select one nominee and submit your vote
        </p>

        {hasVoted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
            You have already voted in this session.
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {nominees.map((nominee) => (
                <label
                  key={nominee.id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedNominee === nominee.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="nominee"
                    value={nominee.id}
                    className="mr-2"
                    onChange={() => setSelectedNominee(nominee.id)}
                  />

                  <span className="font-semibold">{nominee.name}</span>

                  <p className="text-sm text-gray-500">
                    {nominee.party_name}
                  </p>
                </label>
              ))}
            </div>

            <button
              onClick={submitVote}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
            >
              Submit Vote
            </button>
          </>
        )}

        {message && (
          <p className="text-center mt-4 text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}