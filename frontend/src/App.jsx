import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VotePage from "./pages/VotePage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VotePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

// import { useState } from "react";

// function App() {
//   const [selectedNominee, setSelectedNominee] = useState("");

//   const nominees = [
//     "Nominee 1",
//     "Nominee 2",
//     "Nominee 3",
//     "Nominee 4",
//   ];

//   const handleSubmit = () => {
//     if (!selectedNominee) {
//       alert("Please select one nominee");
//       return;
//     }

//     alert(`Your vote submitted for ${selectedNominee}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
//           Online Live Polling
//         </h1>

//         <p className="text-center text-gray-500 mb-8">
//           Select one nominee and submit your vote
//         </p>

//         <div className="space-y-4">
//           {nominees.map((nominee) => (
//             <label
//               key={nominee}
//               className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition ${
//                 selectedNominee === nominee
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:bg-gray-50"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="nominee"
//                 value={nominee}
//                 checked={selectedNominee === nominee}
//                 onChange={(e) => setSelectedNominee(e.target.value)}
//                 className="w-4 h-4"
//               />
//               <span className="text-gray-700 font-medium">{nominee}</span>
//             </label>
//           ))}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//         >
//           Submit Vote
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;