const router = require("express").Router();
let Leaderboard = require("../models/leaderboard.model");

router.route("/").get((req, res) => {
  Leaderboard.find()
    .then((leaderboards) => res.json(leaderboards))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const score = Number(req.body.score);
  const level = Number(req.body.level);
  const rows = Number(req.body.rows);

  const newLeaderboard = new Leaderboard({
    score,
    level,
    rows,
  });

  newLeaderboard
    .save()
    .then(() => res.json("Leaderboard log added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Leaderboard.findById(req.params.id)
    .then((leaderboard) => res.json(leaderboard))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Leaderboard.findByIdAndDelete(req.params.id)
    .then(() => res.json("Leaderboard log deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Leaderboard.findById(req.params.id)
    .then((leaderboard) => {
      leaderboard.score = Number(req.body.score);
      leaderboard.level = Number(req.body.level);

      leaderboard
        .save()
        .then(() => res.json("Leaderboard log updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
