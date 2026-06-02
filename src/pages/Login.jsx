import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function loginAs(user) {
    localStorage.setItem("user", user);
    navigate("/home");
  }

  return (
    <div style={page}>
      <img src="/images/Frame.png" style={{ width: "170px", marginBottom: "40px" }} />

      <h1>Welcome</h1>
      <p>Choose how you want to enter the app</p>

      <button style={btn} onClick={() => loginAs("guest")}>
        Continue as Guest
      </button>

      <button style={btnDark} onClick={() => loginAs("naima")}>
        Login as Naima
      </button>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#00337a",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
};

const btn = {
  width: "230px",
  padding: "15px",
  margin: "10px",
  borderRadius: "12px",
  border: "none",
  fontSize: "18px",
};

const btnDark = {
  ...btn,
  background: "#111735",
  color: "white",
};

export default Login;