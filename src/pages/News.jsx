import { useNavigate } from "react-router-dom";

function News() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h1>News & Events</h1>

      <div style={card}>
        <h2>Conference with Thibault Cauvin</h2>
        <p>Upcoming event at Rennes School of Business.</p>
      </div>

      <div style={card}>
        <h2>Student Life Update</h2>
        <p>New activities and campus events are available.</p>
      </div>

      <button onClick={() => navigate("/home")}>Back Home</button>
    </div>
  );
}

const page = { padding: "30px", fontFamily: "Arial" };
const card = { background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px #ddd", marginBottom: "20px" };

export default News;