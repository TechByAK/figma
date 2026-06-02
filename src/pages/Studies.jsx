import { useNavigate } from "react-router-dom";

function Studies() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h1>Studies</h1>
      <p>Your courses, grades, and study documents will appear here.</p>
      <button onClick={() => navigate("/home")}>Back Home</button>
    </div>
  );
}

const page = { padding: "30px", fontFamily: "Arial" };

export default Studies;