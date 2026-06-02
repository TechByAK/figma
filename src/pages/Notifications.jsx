import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h1>Notifications</h1>

      <div style={card}>Your Stellar Physics class starts soon.</div>
      <div style={card}>New campus event available.</div>

      <button
  onClick={() => navigate("/app")}
  style={{
    background: "#081a4a",
    color: "white",
    border: "none",
    borderRadius: "18px",
    padding: "16px 28px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 6px 18px rgba(8,26,74,0.18)",
    minHeight: "58px"
  }}
>
  🏠 Back Home
</button>
    </div>
  );
}

const page = { padding: "30px", fontFamily: "Arial" };
const card = { background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px #ddd", marginBottom: "20px" };

export default Notifications;