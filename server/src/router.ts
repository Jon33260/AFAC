import express from "express";

//import des middlewares
import form from "./middleware/form";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

//Users routes
import auth from "./middleware/auth";
import userActions from "./modules/user/userActions";

router.post("/api/login", auth.login);

router.get("/api/users", auth.verify, auth.checkAdmin, userActions.browse);
router.get("/api/users/:id", userActions.read);

router.put("/api/users", auth.verify, userActions.edit);
router.post("/api/users", form.validate, auth.hashPassword, userActions.add);
router.delete("/api/users/:id", userActions.destroy);

//Artworks routes
import artworkActions from "./modules/artwork/artworkActions";

router.get("/api/artworks", artworkActions.browse);
router.get("/api/artworks/:id", artworkActions.read);
router.get("/api/search/:search", artworkActions.searchArtwork);
router.get("/api/artworks/user/:id", artworkActions.readByUserId);

router.put("/api/artworks/:id", auth.verify, artworkActions.edit);
router.post("/api/artworks", auth.verify, artworkActions.add);
router.delete("/api/artworks/:id", auth.verify, artworkActions.destroy);

//Events routes
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.get("/api/events/current", eventActions.browseCurrent);
router.get("/api/events/upcoming", eventActions.browseUpcoming);
router.get("/api/events/:id", eventActions.read);

router.put("/api/events/:id", auth.verify, auth.checkAdmin, eventActions.edit);
router.post("/api/events", auth.verify, auth.checkAdmin, eventActions.add);
router.delete(
  "/api/events/:id",
  auth.verify,
  auth.checkAdmin,
  eventActions.destroy,
);

//Event_artwork routes
import eventArtworkActions from "./modules/event_artwork/event_artworkActions";

router.post(
  "/api/event_artworks",
  auth.verify,
  auth.checkAdmin,
  eventArtworkActions.add,
);
router.delete(
  "/api/event_artworks/:id",
  auth.verify,
  auth.checkAdmin,
  eventArtworkActions.destroy,
);

import categoryActions from "./modules/category/categoryActions";

router.get("/api/category", categoryActions.browse);

//Likes routes
import likeActions from "./modules/like/likeActions";

router.get("/api/likes/:id", likeActions.read);
router.post("/api/likes", auth.verify, likeActions.add);
router.delete("/api/likes/:id", auth.verify, likeActions.destroy);

//Follow routes
import followActions from "./modules/follow/followActions";

router.post("/api/follows", auth.verify, followActions.follow);
router.delete(
  "/api/follows/:following_id",
  auth.verify,
  followActions.unfollow,
);
router.get(
  "/api/follows/check/:following_id",
  auth.verify,
  followActions.checkFollow,
);
router.get(
  "/api/follows/followers/:user_id",
  auth.verify,
  followActions.getFollowers,
);
router.get(
  "/api/follows/following/:user_id",
  auth.verify,
  followActions.getFollowing,
);

/* ************************************************************************* */

export default router;
