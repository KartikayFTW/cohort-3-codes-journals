let count = 0;
const counter = (req, res, next) => {
  count++;
  req.count = count;
  next();
};

export default counter;
