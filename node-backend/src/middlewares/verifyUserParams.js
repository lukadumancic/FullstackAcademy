export default function verifyUserParams(req, res, next) {
  if (req.params.id && req.user.id == req.params.id) {
    next();
  }
  res.sendStatus(400);
}
  