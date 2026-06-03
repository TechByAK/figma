import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";

function Help() {
  const isDesktop = useScreenSize();

  if (!isDesktop) {
    return (
      <MobilePageLayout active="help" title="Help">
        <section style={mobilePanel}>
          <p style={text}>Contact student support or check school services.</p>
        </section>
      </MobilePageLayout>
    );
  }

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

const mobilePanel = {
  background: "#f5f6fa",
  borderRadius: "18px",
  padding: "20px",
};

const title = {
  margin: "0 0 14px",
  lineHeight: 1.15,
  color: "#111735",
};

const text = {
  margin: 0,
  lineHeight: 1.6,
  color: "#111735",
  fontSize: "17px",
};

export default Help;
