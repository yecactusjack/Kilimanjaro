import { useContext, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    chatHistory, // ✅ Use chat history
    setInput,
    input,
    loading,
  } = useContext(Context);

  const resultContainerRef = useRef(null);

  // ✅ Auto-scroll to bottom smoothly
  useEffect(() => {
    if (resultContainerRef.current) {
      resultContainerRef.current.scrollTo({
        top: resultContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, loading]);

  return (
    <div className="main">
      <div className="nav">
        <p>Kanishq!</p>
        <img src={assets.user} alt="User" />
      </div>

      <div className="main-container">
        <div className="result" ref={resultContainerRef}>
          {chatHistory.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <img
                src={message.role === "user" ? assets.user : assets.gemini_icon}
                alt={message.role}
              />
              <p dangerouslySetInnerHTML={{ __html: message.text }}></p>
            </div>
          ))}
          {loading && (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          )}
        </div>

        <div className="main-bottom">
          <form
            className="search-box"
            onSubmit={(e) => e.preventDefault()} // ✅ Prevents page refresh
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // ✅ Prevents form submission
                  onSent(input);
                }
              }}
            />
            <div>
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={() => onSent(input)}
              />
            </div>
          </form>

          <div className="bottom-info">
            <p>
              Welcome to Kanishq! Kanishq is here to collect your information in order to make a seamless experience for you. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
