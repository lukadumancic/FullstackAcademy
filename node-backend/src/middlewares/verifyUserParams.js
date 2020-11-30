export default function verifyUserParams(req, res, next) {
  console.log(req.params.id);
  console.log(req.user.id);
  if (req.params.id && req.user.id == req.params.id) {
    next();
  }
  res.sendStatus(400);
}
  