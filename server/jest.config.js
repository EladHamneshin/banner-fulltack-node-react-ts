/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
// module.exports = {
//   "transform": {
//     "^.+\\.tsx?$": "ts-jest"
//   },
//   "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
//   "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js",
//     "jsx",
//     "json",
//     "node"
//   ],
//   "setupFiles": [
//     "<rootDir>/test/setupTests.ts"
//   ]
// };