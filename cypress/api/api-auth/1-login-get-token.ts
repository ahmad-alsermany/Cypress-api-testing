describe("Login user and get tokens", () => {
    const apiUrl = 'https://dummyjson.com/auth/login';

    it("Should get token en login ", () => {
        cy.request({
            method: "POST",
            url: apiUrl,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: 'emilys',
                password: 'emilyspass'
            })
        }).then((response) => {
            expect(response.status).equal(200);
            const authToken = response.body.accessToken;
            cy.log(authToken);
            cy.writeFile('cypress/fixtures/token.json', { authToken });
        })
    })

})