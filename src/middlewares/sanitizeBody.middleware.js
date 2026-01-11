export const sanitizeBody = (req, res, next) => {
  for (const key in req.body) {
    const value = req.body[key];

    if (value === undefined || value === "undefined") {
      delete req.body[key]; // ⬅️ WAJIB delete
    }
  }
  console.log("Iya ini dia", req.body);
  next();
};
