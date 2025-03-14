describe("Create, update, and delete a post", () => {
    let postId;

    it("should add a post and verify it", () => {
        const newPost = {
            userId: 70,
            title: "this is a post test",
            body: "this is an API test",
        };

        cy.request("POST", "/posts", newPost).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.all.keys(["userId", "id", "title", "body"]);
            postId = response.body.id;
            cy.log("Added post ID:", postId);
        });
    });

    it("should update the exist post and verify it", () => {
        cy.request("PUT", "/posts/1", {
            userId: 60,
            title: "this is the edit post test",
            body: "this is a edit API test",
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.all.keys(["userId", "id", "title", "body"]);
            expect(response.body.title).to.equal("this is the edit post test");
            expect(response.body.body).to.equal("this is a edit API test");
            cy.log("Updated post:", JSON.stringify(response.body));
        });
    });

    it("should delete the post and verify it", () => {
        cy.request("DELETE", "/posts/1").then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});
