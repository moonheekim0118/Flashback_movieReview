module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
	transformIgnorePatterns: ["/node_modules/"],
};