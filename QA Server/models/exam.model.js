const { Sequelize, DataTypes } = require("sequelize");
const database = require("../database");
const User = require("./user.model");

const Exam = database.define(
	"Exam",
	{
		uuid: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		topic: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Untitled",
		},
		details: {
			type: DataTypes.TEXT,
		},
		due_date_time: {
			type: "TIMESTAMP",
		},
		pass_marks: {
			type: DataTypes.FLOAT,
		},
		total_marks: {
			type: DataTypes.FLOAT,
		},
		is_started: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		is_completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		shuffle_questions: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		created_by: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
		modelName: "Exam",
		tableName: "exam",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
		updatedAt: "updated_at",
		createdAt: "created_at",
	}
);

User.hasMany(Exam, {
	foreignKey: "created_by",
	as: "creator",
});
Exam.belongsTo(User, {
	foreignKey: "created_by",
	as: "creator",
});

// Exam.sync({ alter: true })
// 	.then(() => console.log("Exam table created"))
// 	.catch((error) => console.log(error));

module.exports = Exam;
