const statusColor = {
  PENDING: "#f0ad4e", // Orange/Amber
  DONE: "#28a745",    // Green
  FAILED: "#dc3545",  // Red
};

const PaymentStatus = ({status}) => {
  return (
    <div className="font-extrabold text-amber-50"
      style={{
        backgroundColor: statusColor[status] || "#6c757d",
        opacity: "10px",
        padding: "6px 12px",
        borderRadius: "25px",
        // color: "#fff",
        display: "inline-block",
      }}
    >{status}</div>
  );
};

export default PaymentStatus;
