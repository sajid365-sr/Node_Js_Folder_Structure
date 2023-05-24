
/** @format */

const express = require("express")
const toolsController = require("../../controllers/tools.controller"); 
const viewCount = require("../../middleware/viewCount");
const limiter = require("../../middleware/Limiter");
const router = express.Router();





// Using controller folder system

router.route("/")
  /**
   * API Documentation (It should be used for every routes)
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(toolsController.getAllTools)
   /**
   * @api {post} /tools save a tool
   * @apiDescription This is an api for getting all tools from the mongoDB database.
   * @apiPermission all users
   *
   * @apiHeader No header required
   *
   * @apiParam  No parameters required
   *
   * @apiSuccess Return an Array[] of Object{} of all tools.
   *
   * @apiError (404) return {message: no tools found}
   */
  .post(toolsController.saveATool)
 
router.route("/:id")
  .get(viewCount, limiter, toolsController.getToolDetails)
  .patch(toolsController.updateTool)
  .delete(toolsController.deleteATool)

// // Shortcuts for same route but different method
// router.route("/").get().post().patch(); // just like that
// router
//   .route("/tools")
//   .get((req, res) => {
//     res.send("Tool found!");
//   })
//   .post((req, res) => {
//     res.send("Tool created!");
//   })
//   .patch((req, res) => {
//     res.send("Tool updated!");
//   });


// Differentiate server side route by using "/api" route. As example :-
// router.get("/api/allTools", (req, res) => { });
// router.get("/api/allTools/:id", (req, res) => { });


// Try to use api version for production level in order to update api if needed in future. As example :-
// router.get("/api/v1/allTools", (req, res) => {});
// router.get("/api/v2/allTools/:id", (req, res) => {});



module.exports = router;
