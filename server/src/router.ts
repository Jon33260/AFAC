import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

//Users routes
import userActions from "./modules/user/userActions";

router.get("/api/users", userActions.browse);
router.get("/api/user/:id", userActions.read);
router.put("/api/user/:id", userActions.edit);
router.post("/api/user", userActions.add);
router.delete("/api/user/:id", userActions.destroy);

//Artworks routes
import artworkActions from "./modules/artwork/artworkActions";

router.get("/api/artworks", artworkActions.browse);
router.get("/api/artwork/:id", artworkActions.read);
router.put("/api/artwork/:id", artworkActions.edit);
router.post("/api/artwork", artworkActions.add);
router.delete("/api/artwork/:id", artworkActions.destroy);

//Events routes
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.get("/api/event/:id", eventActions.read);
router.put("/api/event/:id", eventActions.edit);
router.post("/api/event", eventActions.add);
router.delete("/api/event/:id", eventActions.destroy);

//Event_artwork routes
import eventArtworkActions from "./modules/event_artwork/event_artworkActions";

router.post("/api/event_artwork", eventArtworkActions.add);
router.delete("/api/event_artwork/:id", eventArtworkActions.destroy);

/* ************************************************************************* */

export default router;
