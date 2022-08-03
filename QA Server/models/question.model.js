const { Sequelize, DataTypes } = require("sequelize");
const database = require("../database");
const Exam = require("./exam.model");
const Material = require("./material.model");

const Question = database.define(
	"Question",
	{
		uuid: {
			type: Sequelize.UUID,
			allowNull: false,
			unique: true,
		},
		exam_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		question_text: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		description: {
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "text",
		},
		is_required: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		options: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			defaultValue: [],
			allowNull: true,
		},
		answer_options: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			defaultValue: [],
			allowNull: true,
		},
		answer_options_material_id: {
			type: DataTypes.ARRAY(DataTypes.INTEGER),
			defaultValue: [],
			allowNull: true,
		},
		question_material_id: {
			type: DataTypes.INTEGER,
		},
		answer: {
			type: DataTypes.STRING,
		},
		answer_material_id: {
			type: DataTypes.INTEGER,
		},
		marks: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0.0,
		},
		shuffle_options: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		is_deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		modelName: "Question",
		tableName: "question",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
		updatedAt: "updated_at",
		createdAt: "created_at",
	}
);

Exam.hasMany(Question, {
	foreignKey: "exam_id",
	as: "questions",
});
Question.belongsTo(Exam, {
	foreignKey: "exam_id",
	as: "exam",
});

// Question.sync({ alter: true })
// 	.then(() => console.log("Question table created"))
// 	.catch((error) => console.log(error));

module.exports = Question;
