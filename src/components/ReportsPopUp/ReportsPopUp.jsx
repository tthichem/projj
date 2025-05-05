import React, { useState } from "react";
import "./ReportsPopUp.css";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config";

const ReportsPopUp = ({ onClose = false, theme }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.length < 15) {
      setError("Message must be at least 15 characters long");
      return;
    }
    if (message.length > 500) {
      setError("Message cannot be over 500 characters");
      return;
    }
    try {
      const reponse = await axios.post(`${API_BASE_URL}/api/report/add`, {
        message,
      });
      if (reponse.data.success) {
        setStatus("Report sent successfully");
        setMessage("");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data.error || "Failed to send report");
    }
  };
  const remain = 500 - message.length;
  const minimum = 15;

  return (
    <div className="reports-pop-up">
      <div className={`report-form ${theme}`}>
        <button className="close-button" onClick={onClose}>
          x
        </button>
        <h2>Submit a Report</h2>
        {status && <div className="success">{status}</div>}
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="text">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the problem in detail (minimum 15 characters)..."
              required
              minLength={15}
              maxLength={500}
            />
            <div className="counter">
              {message.length < minimum
                ? `At least ${minimum - message.length} more characters needed`
                : `${remain} characters remaining`}
            </div>
          </div>
          <button
            type="submit"
            disabled={message.length < minimum}
            className="repo"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportsPopUp;
