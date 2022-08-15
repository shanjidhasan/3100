const { Sequelize, DataTypes } = require("sequelize");
const database = require("../database");
const Exam = require("./exam.model");
const User = require("./user.model");

const Answer = database.define(
	"Answer",
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
		answered_by: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		answer: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		},
		obtained_marks: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0.0,
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
		modelName: "Answer",
		tableName: "answer",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
		updatedAt: "updated_at",
		createdAt: "created_at",
	}
);

Exam.hasMany(Answer, {
	foreignKey: "exam_id",
	as: "answers",
});
Answer.belongsTo(Exam, {
	foreignKey: "exam_id",
	as: "exam",
});
User.hasMany(Answer, {
	foreignKey: "answered_by",
	as: "student",
});
Answer.belongsTo(User, {
	foreignKey: "answered_by",
	as: "student",
});

// Answer.sync({ alter: true })
// 	.then(() => console.log("Answer table created"))
// 	.catch((error) => console.log(error));

module.exports = Answer;
