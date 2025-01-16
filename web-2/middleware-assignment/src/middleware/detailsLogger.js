const detailsLogger = (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const timestamp = new Date().toLocaleTimeString(); // Provides time in HH:mm:ss format
  console.log("HTTP method is:", req.method);
  console.log("Full URL is:", fullUrl);
  console.log("Timestamp is:", timestamp);
  next();
};

export default detailsLogger;
