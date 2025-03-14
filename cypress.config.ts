import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        specPattern: [
            // "cypress/e2e/**/*.ts",
            // "cypress/e2e/**/*.js",
            "cypress/api/**/*.ts"],
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        // baseUrl: "https://reqres.in",
        baseUrl:"https://jsonplaceholder.typicode.com"
    },
});
