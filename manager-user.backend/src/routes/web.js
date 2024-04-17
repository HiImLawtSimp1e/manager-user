import express from "express";
import homeControler from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeControler.handleHelloWorld);
  router.get("/user", homeControler.handleUserPage);
  router.post("/user/create-user", homeControler.handleCreateUser);
  router.post("/delete-user/:id", homeControler.handleDeleteUser);
  router.get("/update-user/:id", homeControler.handleGetUpdateUser);
  router.post("/user/update-user", homeControler.handleUpdateUser);

  return app.use("/", router);
};
export default initWebRoutes;
