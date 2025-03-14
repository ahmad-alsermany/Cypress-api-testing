describe("API Testing with Cypress", () => {
    const baseUrl = "https://jsonplaceholder.typicode.com";

    // Test 1: Add a new user and verify it
    it("should add a new user and verify it", () => {
        const newUser = {
            id: 11,  // Use a new unique ID
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496",
                },
            },
        };

        cy.request("POST", `${baseUrl}/users`, newUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("id");
            cy.log("Added user:", JSON.stringify(response.body));
        });
    });

    // Test 2: Fetch a list of users
    it("should fetch a list of users", () => {
        cy.request("GET", `${baseUrl}/users`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.greaterThan(0);
            cy.log("User list:", JSON.stringify(response.body));
        });
    });

    // Test 3: Create a new post
    it("should create a new post", () => {
        const newPost = {
            title: "Cypress Test Post",
            body: "This is a test post created with Cypress.",
            userId: 1,
        };

        cy.request("POST", `${baseUrl}/posts`, newPost).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("id");
            cy.log("Created post:", JSON.stringify(response.body));
        });
    });

    // Test 4: Update a post
    it("should update a post", () => {
        cy.request("PUT", `${baseUrl}/posts/1`, {
            id: 1,
            title: "Updated Title",
            body: "Updated content.",
            userId: 1,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.title).to.eq("Updated Title");
            cy.log("Updated post:", JSON.stringify(response.body));
        });
    });

    // Test 5: Delete a post
    it("should delete a post", () => {
        cy.request("DELETE", `${baseUrl}/posts/1`).then((response) => {
            expect(response.status).to.eq(200);
            cy.log("Deleted post response:", JSON.stringify(response.body));
        });
    });
});
