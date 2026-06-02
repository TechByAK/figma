import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h1>Notifications</h1>

      <div style={card}>Your Stellar Physics class starts soon.</div>
      <div style={card}>New campus event available.</div>

      <button onClick={() => navigate("/home")}>Back Home</button>
    </div>
  );
}

const page = { padding: "30px", fontFamily: "Arial" };
const card = { background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px #ddd", marginBottom: "20px" };

export default Notifications;