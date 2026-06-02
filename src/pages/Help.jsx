import { useNavigate } from "react-router-dom";

function Help() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h1>Help</h1>
      <p>Contact student support or check school services.</p>
      <button onClick={() => navigate("/home")}>Back Home</button>
    </div>
  );
}

const page = { padding: "30px", fontFamily: "Arial" };

export default Help;