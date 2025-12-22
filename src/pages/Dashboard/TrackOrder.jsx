import { motion } from "framer-motion";

const steps = [
  "Cutting Completed", "Sewing Started", "Finishing", 
  "QC Checked", "Packed", "Shipped / Out for Delivery"
]; // Mandatory steps [cite: 226]

const TrackOrder = ({ currentStatus = "Sewing Started" }) => {
  return (
    <div className="track-container">
      <h2>Order Production Status</h2>
      <div className="timeline">
        {steps.map((step, index) => (
          <motion.div 
            key={step}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`timeline-item ${step === currentStatus ? "active" : ""}`}
          >
            <div className="dot"></div>
            <div className="step-content">
              <h4>{step}</h4>
              <p>{step === currentStatus ? "In Progress" : "Pending"}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;