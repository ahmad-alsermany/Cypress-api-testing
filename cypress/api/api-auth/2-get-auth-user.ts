describe("Login user and get tokens 1", () => {
    const apiUrl = 'https://dummyjson.com/auth/me';

    it("Should get token en login ", () => {
        cy.fixture('token.json').then((data: { authToken: string }) => {
            const authToken: string = data.authToken;

            cy.request({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equals(200);
                cy.log(response.body);
                cy.log(authToken);
            })
        })
    })
})