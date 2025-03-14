describe("Ensure the deleted post is removed", () => {

    it("should delete the post and verify it", () => {
        cy.request("DELETE", "/posts/1").then((response) => {
            expect(response.status).to.eq(200);
        });

        cy.request("GET", "/posts/1").then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id", 1);
        });
    });

});
