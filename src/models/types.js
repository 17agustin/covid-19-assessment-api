const cases = {
  new: { type: String, required: false },
  active: { type: Number, required: false },
  critical: { type: Number, required: false },
  recovered: { type: Number, required: false },
  "1M_pop": { type: String, required: false },
  total: { type: Number, required: false },
};

const deaths = {
  new: { type: String, required: false },
  "1M_pop": { type: String, required: false },
  total: { type: Number, required: false },
};

const tests = {
  "1M_pop": { type: String, required: false },
  total: { type: Number, required: false },
};

module.exports = {
  cases,
  deaths,
  tests,
};
