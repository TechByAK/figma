import { useNavigate } from "react-router-dom";

function Studies() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h1>Studies</h1>
      <p>Your courses, grades, and study documents will appear here.</p>
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

export default Studies;