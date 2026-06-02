import DesktopLayout from "../components/DesktopLayout";

function Notifications() {
  return (
    <DesktopLayout>
      <section style={panel}>
        <h1 style={title}>Notifications</h1>

        <div style={card}>Your Stellar Physics class starts soon.</div>
        <div style={card}>New campus event available.</div>
      </section>
    </DesktopLayout>
  );
}

const panel = {
  background: "white",
  borderRadius: "26px",
  padding: "28px",
  minHeight: "calc(100vh - 160px)",
  boxShadow: "0 5px 22px rgba(20, 25, 50, 0.12)",
};

const title = {
  margin: "0 0 24px",
  color: "#111735",
};

const card = {
  background: "#f5f6fa",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "20px",
};

export default Notifications;
