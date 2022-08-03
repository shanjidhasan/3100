const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
	createChapterMaterial,
	updateChapterMaterial,
	deleteMaterial,
	getDeletedMaterials,
	restoreMaterial,
	deactivateMaterial,
} = require("../controllers/material.controller");
const authorizeModerator = require("../middleware/authorizeModerator");
const authorizeVerifiedUser = require("../middleware/authorizeVerifiedUser");

const router = express.Router();

//Upload
const multer = require("multer");
var fs = require("fs");

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		if (!fs.existsSync("public/materials/class")) {
			fs.mkdirSync("public/materials/class", { recursive: true });
		}
		cb(null, "public/materials/class");
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + "--" + file.originalname);
	},
});
const upload = multer({ storage: fileStorageEngine });
//Upload

router.post(
	"/create_chapter_material",
	authorizeVerifiedUser,
	upload.fields([
		{
			name: "chapter_material",
			maxCount: 1,
		},
	]),
	createChapterMaterial
);
router.patch(
	"/update_chapter_material/:chapterMaterialId",
	authorizeVerifiedUser,
	upload.fields([
		{
			name: "chapter_material",
			maxCount: 1,
		},
	]),
	updateChapterMaterial
);
router.delete(
	"/delete_material/:chapterMaterialId",
	authorizeVerifiedUser,
	deleteMaterial
);
router.put(
	"/deactivate_material/:materialId",
	authorizeVerifiedUser,
	deactivateMaterial
);
router.get("/get_deleted_materials", authorizeModerator, getDeletedMaterials);
router.patch(
	"/restore_material/:chapter_x_material_id",
	authorizeModerator,
	restoreMaterial
);

module.exports = router;
