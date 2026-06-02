import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, []);

  if (loading) {

    return (

      <div style={{
        height:"100vh",
        background:"#00337a",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>

        <img
          src="/images/Frame.png"
          style={{ width:"180px" }}
        />

      </div>

    );
  }

  return (

    <div style={{
      padding:"32px",
      paddingBottom:"120px",
      background:"white",
      minHeight:"100vh",
      fontFamily:"Arial"
    }}>

      {/* HEADER */}

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"35px"
      }}>

        <div style={{
          display:"flex",
          alignItems:"center",
          gap:"15px"
        }}>

          <img
            src="/images/naima-figma.png"
            style={{
              width:"58px",
              height:"58px",
              borderRadius:"50%"
            }}
          />

          <div>

            <p style={{
              margin:0,
              color:"#6b7190",
              fontSize:"24px"
            }}>
              Hi
            </p>

            <h1 style={{
              margin:0,
              color:"#111735",
              fontSize:"42px"
            }}>
              Naima !
            </h1>

          </div>

        </div>

        <div style={{
          display:"flex",
          gap:"15px"
        }}>

          <button style={{
            border:"none",
            background:"#f4f5f8",
            borderRadius:"50%",
            width:"55px",
            height:"55px",
            fontSize:"24px"
          }}>
            🔔
          </button>

          <button style={{
            border:"none",
            background:"#f4f5f8",
            borderRadius:"50%",
            width:"55px",
            height:"55px",
            fontSize:"24px"
          }}>
            ⚙️
          </button>

        </div>

      </div>

      {/* CARDS */}

      <div style={{
        background:"#f4f4f6",
        padding:"16px",
        borderRadius:"28px",
        marginBottom:"60px"
      }}>

        {/* COURSE CARD */}

        <div style={{
          background:"white",
          borderRadius:"18px",
          padding:"16px",
          display:"flex",
          gap:"20px",
          alignItems:"center",
          boxShadow:"0 4px 15px #ddd"
        }}>

          <div style={{
            background:"#fde6f3",
            borderRadius:"12px",
            padding:"18px",
            textAlign:"center"
          }}>

            <div style={{ color:"#7a0b4f" }}>
              Tue
            </div>

            <div style={{
              fontSize:"44px",
              fontWeight:"bold",
              color:"#7a0b4f"
            }}>
              16
            </div>

          </div>

          <div style={{ flex:1 }}>

            <h2 style={{
              margin:0,
              color:"#111735"
            }}>
              Stellar Physics
            </h2>

            <p style={{
              margin:"10px 0",
              color:"#007c8c"
            }}>
              📍 Bat. B &nbsp;&nbsp; Salle 12
            </p>

            <p style={{ margin:0 }}>
              🕘 3 PM → 5 PM
            </p>

          </div>

          <h2 style={{ color:"#9aa0b5" }}>
            2h.
          </h2>

        </div>

        {/* WELCOME CARD */}

        <div style={{
          background:"white",
          borderRadius:"18px",
          padding:"25px",
          marginTop:"20px",
          boxShadow:"0 4px 15px #ddd"
        }}>

          <div style={{
            display:"flex",
            justifyContent:"space-between"
          }}>

            <h2 style={{
              margin:0,
              color:"#111735"
            }}>
              Welcome to Rennes School of Business !
            </h2>

            <span style={{
              fontSize:"30px",
              color:"#6b7190"
            }}>
              ×
            </span>

          </div>

          <p style={{
            color:"#6b7190",
            fontSize:"20px"
          }}>
            We are delighted to welcome you to this space dedicated to your academic and personal success...
          </p>

          <button>Campus map</button>

          <button style={{ marginLeft:"10px" }}>
            School services
          </button>

        </div>

      </div>

      {/* EVENTS */}

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>

        <div style={{
          display:"flex",
          gap:"35px"
        }}>

          <h2 style={{
            margin:0,
            borderBottom:"4px solid #111735"
          }}>
            Events
          </h2>

          <h2 style={{
            margin:0,
            color:"#6b7190"
          }}>
            News
          </h2>

        </div>

        <h2 style={{
          margin:0,
          color:"#00a8c8",
          fontWeight:"normal"
        }}>
          See All
        </h2>

      </div>

      <hr/>

      <img
        src="/images/event1.png"
        style={{
          width:"100%",
          borderRadius:"18px",
          marginTop:"25px"
        }}
      />

      <img
        src="/images/event2.png"
        style={{
          width:"100%",
          borderRadius:"18px",
          marginTop:"35px"
        }}
      />

      {/* BOTTOM NAV */}

      <div style={{
        position:"fixed",
        bottom:0,
        left:0,
        right:0,
        background:"white",
        display:"flex",
        justifyContent:"space-around",
        padding:"22px 0",
        boxShadow:"0 -4px 18px #ddd"
      }}>

        <div
          onClick={() => navigate("/dashboard")}
          style={{
            textAlign:"center",
            color:"#111735",
            cursor:"pointer"
          }}
        >
          ⊞<br/>
          Dashboard
        </div>

        <div
          onClick={() => navigate("/calendar")}
          style={{
            textAlign:"center",
            color:"#9aa0b5",
            cursor:"pointer"
          }}
        >
          🗓️<br/>
          Schedule
        </div>

        <div style={{
          textAlign:"center",
          color:"#9aa0b5"
        }}>
          🎓<br/>
          Studies
        </div>

        <div style={{
          textAlign:"center",
          color:"#9aa0b5"
        }}>
          ❔<br/>
          Help
        </div>

      </div>

    </div>

  );
}

export default Home;