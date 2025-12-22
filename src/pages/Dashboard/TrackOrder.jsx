import { motion } from "framer-motion";


const steps = ["Cutting Completed", "Sewing Started", "Finishing", "QC Checked", "Packed", "Shipped / Out for Delivery"];

const TrackOrder = ({ currentStatus = "Sewing Started" }) => (
  <div className="track-container">
    <h2 className="track-title">Order Status Timeline</h2>
    <div className="timeline">
      {steps.map((step, i) => (
        <motion.div 
          key={i} 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: i * 0.1 }}
          className={`timeline-item ${step === currentStatus ? "active" : ""}`}
        >
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h4>{step}</h4>
            <p>{step === currentStatus ? "In Progress" : "Pending"}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default TrackOrder;
