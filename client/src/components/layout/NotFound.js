import React from "react";

const NotFound = () => {
  const styles = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9fafb",
      color: "#333",
      textAlign: "center",
      padding: "20px",
      zIndex: 9999,
    },
    icon: {
      fontSize: "5rem",
      color: "#ff6b6b",
      marginBottom: "20px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    message: {
      fontSize: "1.2rem",
      color: "#666",
      maxWidth: "400px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.icon}>⚠️</div>
      <h1 style={styles.title}>Oops! Page Not Found</h1>
      <p style={styles.message}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
    </div>
  );
};

export default NotFound;
