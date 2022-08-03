const trace = (msg) => (x) => {
  console.log(msg, x);
  return x;
};

export default trace;
