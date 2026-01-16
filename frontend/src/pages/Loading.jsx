function Loading() {
  return (
    <div className="loading-container">
      {/* 🌕 Moon */}
      <div className="moon"></div>

      {/* 🦇 Bats */}
      <span className="bat bat1">🦇</span>
      <span className="bat bat2">🦇</span>
      <span className="bat bat3">🦇</span>

      {/* 🎃 Pumpkins */}
      <span className="pumpkin p1">🎃</span>
      <span className="pumpkin p2">🎃</span>

      {/* 👻 Ghost */}
      <span className="ghost">👻</span>

      {/* 🔄 Spinner */}
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <div className="spinner spinner-top"></div>
      </div>

      {/* Text */}
      <p className="title">🎃 Summoning your account...</p>
      <p className="subtitle">Please wait while we open the portal 👻</p>

      {/* 🎨 CSS INSIDE SAME FILE */}
      <style>{`
        .loading-container {
          min-height: 100vh;
          background: radial-gradient(circle at top, #0f172a, #000);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          overflow: hidden;
          font-family: sans-serif;
        }

        .moon {
          position: absolute;
          top: 30px;
          right: 40px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 40px rgba(255,255,255,0.1);
        }

        .spinner-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .spinner {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(34,197,94,0.2);
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        .spinner-top {
          position: absolute;
          top: 0;
          left: 0;
          border: 4px solid #22c55e;
          border-top-color: transparent;
        }

        .title {
          margin-top: 20px;
          color: #22c55e;
          font-size: 18px;
          font-weight: 600;
          animation: pulse 1.8s infinite;
        }

        .subtitle {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 6px;
        }

        .bat {
          position: absolute;
          font-size: 26px;
        }

        .bat1 {
          top: 20%;
          left: -40px;
          animation: batFly1 9s linear infinite;
        }

        .bat2 {
          top: 35%;
          right: -40px;
          animation: batFly2 11s linear infinite;
        }

        .bat3 {
          bottom: 30%;
          left: -40px;
          animation: batFly1 13s linear infinite;
        }

        .pumpkin {
          position: absolute;
          font-size: 36px;
          animation: float 5s ease-in-out infinite;
        }

        .p1 {
          bottom: 30px;
          left: 40px;
        }

        .p2 {
          bottom: 60px;
          right: 50px;
          animation-duration: 7s;
        }

        .ghost {
          position: absolute;
          top: 50%;
          left: 20px;
          font-size: 40px;
          animation: ghost 6s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes ghost {
          0% { transform: translateX(0); opacity: 0.4; }
          50% { transform: translateX(25px); opacity: 1; }
          100% { transform: translateX(0); opacity: 0.4; }
        }

        @keyframes batFly1 {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0; }
        }

        @keyframes batFly2 {
          0% { transform: translateX(0); opacity: 0; }
          100% { transform: translateX(-110vw); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Loading;
