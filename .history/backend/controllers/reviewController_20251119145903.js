import Review from "../models/reviewModel.js";
import Spot from "../models/spotModel.js";

export const createReview = (req, res) => {
  const data = req.body;
  const {spot_id} = data;
  Review.create(req.body, (err) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json({ message: "Review added" });
  });
};

export const getReviewsBySpot = (req, res) => {
  Review.getBySpot(req.params.spotId, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
};


