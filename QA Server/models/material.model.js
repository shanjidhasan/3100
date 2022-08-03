const { Sequelize, DataTypes } = require("sequelize");
const database = require("../database");
const User = require("../models/user.model");

const Material = database.define(
	"Material",
	{
		uuid: {
			type: Sequelize.UUID,
			allowNull: false,
			unique: true,
		},
		title: {
			type: DataTypes.STRING,
		},
		details: {
			type: DataTypes.STRING,
		},
		file_path: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		encoding: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Unknown",
		},
		uploader_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		file_type: {
			type: DataTypes.STRING,
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
		modelName: "Material",
		tableName: "material",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
		updatedAt: "updated_at",
		createdAt: "created_at",
	}
);

User.hasMany(Material, {
	foreignKey: "uploader_id",
	as: "uploder",
});
Material.belongsTo(User, {
	foreignKey: "uploader_id",
	as: "uploder",
});

// Material.sync({ alter: true })
// 	.then(() => console.log("Material table created successfully"))
// 	.catch((err) => console.log("Error creating Material table", err));

module.exports = Material;
