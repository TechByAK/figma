import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";

function Studies() {
  const isDesktop = useScreenSize();

  if (!isDesktop) {
    return (
      <MobilePageLayout active="studies" title="Studies">
        <section style={mobilePanel}>
          <p style={text}>Your courses, grades, and study documents will appear here.</p>
        </section>
      </MobilePageLayout>
    );
  }

  return (
    <DesktopLayout>
      <section style={panel}>
        <h1 style={title}>Studies</h1>
        <p style={text}>Your courses, grades, and study documents will appear here.</p>
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

export default Studies;
