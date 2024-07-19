import { Router } from "express";
import { isAdmin, isInstructor } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  getCategoryDetails,
  showAllCategorys,
} from "../controllers/category.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createCourse,
  getCourse,
  showAllCourses,
} from "../controllers/Course.controller.js";
import {
  createSection,
  deleteSection,
  updateSection,
} from "../controllers/section.controller.js";
import { createsubSection } from "../controllers/subSection.controller.js";

const router = Router();

router.route("/create-category").post(auth, isAdmin, createCategory);
router.route("/showallcategory").get(showAllCategorys);
router.route("/getcategorydetails").post(auth, getCategoryDetails);
router.route("/create-course").post(auth, isInstructor, createCourse);
router.route("/get-course").post(auth, getCourse);
router.route("/showallcourses").get(showAllCourses);
router.route("/create-section").post(auth, isInstructor, createSection);
router.route("/update-section").post(auth, updateSection);
router.route("/delete-section").post(auth, deleteSection);

router.route("/create-subsection").post(auth, isInstructor, createsubSection);

export default router;
