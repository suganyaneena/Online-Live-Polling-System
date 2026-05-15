import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import API from "../api/api";
import socket from "../socket";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    totalVotes: 0,
    nominees: [],
  });

  const getVoteSummary = async () => {
    try {
      const res = await API.get("/votes/summary");

      if (res.data.success) {
        setSummary({
          totalVotes: res.data.totalVotes,
          nominees: res.data.nominees,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  useEffect(() => {
    getVoteSummary();

    socket.on("voteUpdated", (data) => {
      setSummary(data);
    });

    return () => {
      socket.off("voteUpdated");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="text-gray-500">Total Votes</p>
        <h2 className="text-4xl font-bold">{summary.totalVotes}</h2>
      </div>

      <div className="grid md:grid-cols-5 gap-4 mb-6">
        {summary.nominees.map((nominee) => (
          <div
            key={nominee.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h3 className="font-semibold">{nominee.name}</h3>
            <p className="text-sm text-gray-500">{nominee.party_name}</p>
            <p className="text-2xl font-bold mt-3">
              {nominee.vote_count}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Live Vote Graph</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={summary.nominees}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="vote_count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}