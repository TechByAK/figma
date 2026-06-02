import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div style={page}>
      <h1>Settings</h1>
      <p>Manage your profile and app preferences.</p>

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
      <button
  onClick={() => {
    localStorage.removeItem("user");
    navigate("/login");
  }}
  style={{
    background: "#ff5757",
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
    boxShadow: "0 6px 18px rgba(255,87,87,0.25)",
    minHeight: "58px"
  }}
>
  🚪 Logout
</button>
    </div>
  );
}

const page = { padding: "30px", fontFamily: "Arial" };

export default Settings;