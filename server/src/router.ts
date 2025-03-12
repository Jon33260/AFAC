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
router.put("/api/users/:id", userActions.edit);
router.post("/api/users", form.validate, auth.hashPassword, userActions.add);
router.delete("/api/users/:id", userActions.destroy);

//Artworks routes
import artworkActions from "./modules/artwork/artworkActions";

router.get("/api/artworks", artworkActions.browse);
router.get("/api/artworks/:id", artworkActions.read);
router.get("/api/search/:search", artworkActions.searchArtwork);
router.get("/api/events/current", eventActions.browseCurrent);
router.get("/api/events/upcoming", eventActions.browseUpcoming);
router.put("/api/artworks/:id", artworkActions.edit);
router.post("/api/artworks", auth.verify, artworkActions.add);
router.delete("/api/artworks/:id", artworkActions.destroy);
router.get("/api/artworks/user/:id", artworkActions.readByUserId);

//Events routes
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.get("/api/events/current", eventActions.browseCurrent);
router.get("/api/events/upcoming", eventActions.browseUpcoming);
router.get("/api/events/:id", eventActions.read);
router.put("/api/events/:id", eventActions.edit);
router.post("/api/events", eventActions.add);
router.delete("/api/events/:id", eventActions.destroy);

//Event_artwork routes
import eventArtworkActions from "./modules/event_artwork/event_artworkActions";

router.post("/api/event_artworks", eventArtworkActions.add);
router.delete("/api/event_artworks/:id", eventArtworkActions.destroy);

import categoryActions from "./modules/category/categoryActions";

router.get("/api/category", categoryActions.browse);

//Likes routes
import likeActions from "./modules/like/likeActions";

router.get("/api/likes/:id", likeActions.read);
router.post("/api/likes", auth.verify, likeActions.add);
router.delete("/api/likes/:id", auth.verify, likeActions.destroy);

/* ************************************************************************* */

export default router;
