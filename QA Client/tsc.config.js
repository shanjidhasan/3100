module.exports = {
	apps: [
		{
			name: "tsc-client",
			script: "./src/index.js",
			watch: true,
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
