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
import usersActions from "./modules/item/users/usersActions";

router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
router.put("/api/users/:id", usersActions.edit);
router.post("/api/users", usersActions.add);
router.delete("/api/users/:id", usersActions.destroy);

/* ************************************************************************* */

export default router;
