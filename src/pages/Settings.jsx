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

      <button onClick={() => navigate("/home")}>Back Home</button>
      <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
    </div>
  );
}

const page = { padding: "30px", fontFamily: "Arial" };

export default Settings;