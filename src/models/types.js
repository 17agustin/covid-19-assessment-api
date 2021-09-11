const cases = {
  new: { type: String, required: false },
  active: { type: Number, required: false },
  critical: { type: Number, required: false },
  recovered: { type: Number, required: false },
  total: { type: Number, required: false },
};

const deaths = {
  new: { type: String, required: false },
  total: { type: Number, required: false },
};

const tests = {
  total: { type: Number, required: false },
};

module.exports = {
  cases,
  deaths,
  tests,
};
