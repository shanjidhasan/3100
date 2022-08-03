const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const Material = require("../models/material.model");
const Subject_x_Class = require("../models/subject_x_class.model");
const Chapter_x_Material = require("../models/chapter_x_material.model");
const Course = require("../models/course.model");
const fs = require("fs");
const User = require("../models/user.model");
const Role = require("../models/role.model");

exports.createChapterMaterial = async (data, files, userId) => {
	try {
		console.log(data);
		console.log(files);
		console.log(userId);
		const { chapter_x_subject_id, course_id } = data;

		if (!chapter_x_subject_id) {
			throw new Error("chapter_x_subject_id is required");
		}
		if (!course_id) {
			throw new Error("course_id is required");
		}
		if (files.chapter_material == null) {
			throw new Error("chapter_material is required");
		}
		const courseData = await Course.findOne({
			where: {
				id: course_id,
				is_active: true,
				is_deleted: false,
			},
			include: [
				{
					model: Subject_x_Class,
					attributes: ["class_id"],
					as: "subject",
				},
			],
		});
		if (courseData == null) {
			throw new Error("course not found");
		}

		const user = await User.findOne({
			where: {
				id: userId,
			},
			include: [
				{
					model: Role,
					as: "role",
					attributes: [
						"is_student",
						"is_teacher",
						"is_guardian",
						"is_admin",
						"is_superadmin",
					],
				},
			],
		});

		var materialFolderName = "";
		if (user.role.is_admin || user.role.is_superadmin) {
			materialFolderName = "admin";
		} else if (user.role.is_teacher) {
			materialFolderName = "teacher";
		}

		var rootDir = "public/";
		var destination =
			"materials/class/" +
			courseData.subject.class_id +
			"/subject_" +
			courseData.subject_x_class_id +
			"/course_" +
			course_id +
			"/chapter_" +
			chapter_x_subject_id +
			"/files/" +
			materialFolderName +
			"/materials";
		var dir = rootDir + destination;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		fs.rename(
			files.chapter_material[0].path,
			dir + "/" + files.chapter_material[0].filename,
			function (err) {
				if (err) throw err;
			}
		);
		var course_chapter_material = await Material.create({
			uuid: uuidv4(),
			title: files.chapter_material[0].originalname,
			file_path: destination + "/" + files.chapter_material[0].filename,
			file_type: "document",
			size: files.chapter_material[0].size,
			encoding: files.chapter_material[0].encoding,
			uploader_id: userId,
		});
		const materialData = await Chapter_x_Material.create({
			uuid: uuidv4(),
			chapter_x_subject_id: chapter_x_subject_id,
			chapter_material_id: course_chapter_material.id,
			course_id: course_id,
		});
		courseData.number_of_materials = courseData.number_of_materials + 1;
		await courseData.save();

		if (user.role.is_admin || user.role.is_superadmin) {
			// get other courses of this subject and class
			const otherCourses = await Course.findAll({
				where: {
					subject_x_class_id: courseData.subject_x_class_id,
					is_active: true,
					is_deleted: false,
					// created_by not in [1]
					created_by: {
						[Op.notIn]: [1],
					},
				},
				include: [
					{
						model: Subject_x_Class,
						attributes: ["class_id"],
						as: "subject",
					},
				],
			});

			for (let i = 0; i < otherCourses.length; i++) {
				const course = otherCourses[i];
				await Chapter_x_Material.create({
					uuid: uuidv4(),
					chapter_x_subject_id: chapter_x_subject_id,
					chapter_material_id: course_chapter_material.id,
					course_id: course.id,
				});
				course.number_of_materials = course.number_of_materials + 1;
				await course.save();
			}
		}

		return materialData;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
};

exports.updateChapterMaterial = async (params, data, files, userId) => {
	try {
		const { chapterMaterialId } = params;
		if (files == null) {
			throw new Error("No data to update");
		}
		const chapter_x_materialData = await Chapter_x_Material.findOne({
			where: {
				id: chapterMaterialId,
				is_active: true,
				is_deleted: false,
			},
			attributes: [
				"id",
				"chapter_material_id",
				"chapter_x_subject_id",
				"course_id",
			],
			include: [
				{
					model: Course,
					attributes: ["subject_x_class_id"],
					as: "course",
					include: [
						{
							model: Subject_x_Class,
							attributes: ["class_id"],
							as: "subject",
						},
					],
				},
			],
		});
		if (!chapter_x_materialData) {
			throw new Error("chapter_x_materialData not found");
		}
		if (files.chapter_material != null) {
			var rootDir = "public/";
			var destination =
				"materials/class/" +
				courseData.subject.class_id +
				"/subject_" +
				courseData.subject_x_class_id +
				"/course_" +
				course_id +
				"/chapter_" +
				chapter_x_subject_id +
				"/files/" +
				materialFolderName +
				"/materials";
			var dir = rootDir + destination;
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			fs.rename(
				files.chapter_material[0].path,
				dir + "/" + files.chapter_material[0].filename,
				function (err) {
					if (err) throw err;
				}
			);
			const chapter_material = await Material.create({
				uuid: uuidv4(),
				title: files.chapter_material[0].originalname,
				file_path:
					destination + "/" + files.chapter_material[0].filename,
				file_type: "image",
				size: files.chapter_material[0].size,
				encoding: files.chapter_material[0].encoding,
				uploader_id: userId,
			});
			const old_chapter_material = await Material.findOne({
				where: {
					id: chapter_x_materialData.chapter_material_id,
					is_active: true,
					is_deleted: false,
				},
				attributes: ["id", "is_deleted"],
			});
			if (old_chapter_material != null) {
				old_chapter_material.is_deleted = true;
				await old_chapter_material.save();
			}
			chapter_x_materialData.chapter_material_id = chapter_material.id;
		}
		await chapter_x_materialData.save();
		return chapter_x_materialData;
	} catch (error) {
		throw new Error(error);
	}
};

exports.deleteMaterial = async (params) => {
	try {
		const { chapterMaterialId } = params;
		var materialData = await Chapter_x_Material.findOne({
			where: {
				id: chapterMaterialId,
				is_active: true,
				is_deleted: false,
			},
		});
		if (!materialData) {
			throw new Error("Chapter Material not found");
		}
		materialData.is_deleted = true;
		await materialData.save();

		// get all materials with this id
		const chapter_material_id = materialData.chapter_material_id;
		var materials = await Chapter_x_Material.findAll({
			where: {
				chapter_material_id: chapter_material_id,
				is_active: true,
				is_deleted: false,
			},
		});
		for (var i = 0; i < materials.length; i++) {
			var material = materials[i];
			material.is_deleted = true;
			await material.save();
		}
		return materialData;
	} catch (error) {
		// console.log(error);
		throw new Error(error);
	}
};

exports.deactivateMaterial = async (params) => {
	try {
		const { materialId } = params;
		var materialData = await Chapter_x_Material.findOne({
			where: {
				id: materialId,
				is_active: true,
				is_deleted: false,
			},
		});
		if (!materialData) {
			throw new Error("Chapter Material not found");
		}
		materialData.is_active = false;
		await materialData.save();
		return materialData;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.getDeletedMaterials = async () => {
	try {
		var materialData = await Chapter_x_Material.findAll({
			where: {
				is_deleted: true,
			},
		});
		if (!materialData) {
			throw new Error("Materials not found");
		}
		return materialData;
	} catch (error) {
		// console.log(error);
		throw new Error(error);
	}
};

exports.restoreMaterial = async (params) => {
	try {
		const { chapter_x_material_id } = params;
		var materialData = await Chapter_x_Material.findOne({
			where: {
				id: chapter_x_material_id,
				is_active: true,
				is_deleted: true,
			},
		});
		if (!materialData) {
			throw new Error("Material not found");
		}
		materialData.is_deleted = false;
		await materialData.save();
		return materialData;
	} catch (error) {
		// console.log(error);
		throw new Error(error);
	}
};
