import DesktopLayout from "../components/DesktopLayout";

function Help() {
  return (
    <DesktopLayout>
      <section style={panel}>
        <h1 style={title}>Help</h1>
        <p style={text}>Contact student support or check school services.</p>
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
  margin: "0 0 14px",
  lineHeight: 1.15,
  color: "#111735",
};

const text = {
  margin: 0,
  lineHeight: 1.6,
  color: "#596080",
  fontSize: "17px",
};

export default Help;
