function Notification({ message, show, onClose }) {
    if (!show) return null;
  
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'lightgreen',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,.5)',
      }}>
        {message}
        <button onClick={(e) => {
            e.stopPropagation();
            onClose();
            }} style={{ marginLeft: '10px', cursor: 'pointer' }}>✖</button>
      </div>
    );
  }
  
  export default Notification;
  