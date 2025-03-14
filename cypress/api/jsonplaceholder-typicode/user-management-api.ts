describe("Create a new user and verify it exists.", () => {
    const baseUrl = "https://jsonplaceholder.typicode.com";

    // Test 1: Add a new user and verify it
    it("should add a new todo and verify it", () => {
        const newTodo = {
            userId: 70,
            id: 10,
            completed: true,
        };

        cy.request("POST", `${baseUrl}/todos`, newTodo).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("id", 201);
            expect(response.body).to.have.property("userId", 70);
            expect(response.body).to.have.property("completed", true);
            expect(response.body).to.include.all.keys("userId", "completed");
            cy.log("Added user:", JSON.stringify(response.body));
        });
    });

    it("should have array", () => {
        cy.request("GET", `${baseUrl}/todos`).then((response) => {
            expect(response.body).to.be.an("array");
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0); // Ensure it has items

            const firstTodo = response.body[0]; // Get the first object
            expect(firstTodo).to.have.all.keys("userId", "id", "title", "completed");
            expect(firstTodo.completed).to.be.a("boolean");
            cy.log(JSON.stringify(response.body));
        });
    });

    // Steps:
    //     Send a POST request to /users with a new user payload.
    //     Validate that the response status is 201 Created.
    //     Extract the user ID from the response.
    //     Send a GET request to /users.
    //     Validate that the created user exists in the user list.





    // // Test 2: Fetch a list of users
    // it("should fetch a list of users", () => {
    //     cy.request("GET", `${baseUrl}/users`).then((response) => {
    //         expect(response.status).to.eq(200);
    //         expect(response.body).to.be.an("array");
    //         expect(response.body.length).to.be.greaterThan(0);
    //         cy.log("User list:", JSON.stringify(response.body));
    //     });
    // });
    //
    // // Test 3: Create a new post
    // it("should create a new post", () => {
    //     const newPost = {
    //         title: "Cypress Test Post",
    //         body: "This is a test post created with Cypress.",
    //         userId: 1,
    //     };
    //
    //     cy.request("POST", `${baseUrl}/posts`, newPost).then((response) => {
    //         expect(response.status).to.eq(201);
    //         expect(response.body).to.have.property("id");
    //         cy.log("Created post:", JSON.stringify(response.body));
    //     });
    // });
    //
    // // Test 4: Update a post
    // it("should update a post", () => {
    //     cy.request("PUT", `${baseUrl}/posts/1`, {
    //         id: 1,
    //         title: "Updated Title",
    //         body: "Updated content.",
    //         userId: 1,
    //     }).then((response) => {
    //         expect(response.status).to.eq(200);
    //         expect(response.body.title).to.eq("Updated Title");
    //         cy.log("Updated post:", JSON.stringify(response.body));
    //     });
    // });
    //
    // // Test 5: Delete a post
    // it("should delete a post", () => {
    //     cy.request("DELETE", `${baseUrl}/posts/1`).then((response) => {
    //         expect(response.status).to.eq(200);
    //         cy.log("Deleted post response:", JSON.stringify(response.body));
    //     });
    // });
});
