import {Router} from "express";
import * as UserController from "./user.controller";

const routes = new Router();

routes.post("/signup", UserController.createUser);
routes.post("/login", UserController.SignInUser);

// routes.post('/:userId/post', UserController.createUserPost);
// routes.get('/:userId/posts', UserController.getUserPosts);

export default routes;
