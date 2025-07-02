const colorCode = {
  DONE: "#28a745",      // green
  PENDING: "#ffc107",   // yellow
  FAILED: "#dc3545",    // red
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
