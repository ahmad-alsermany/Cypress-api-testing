// describe("Refresh auth session", () => {
//     const apiUrl = 'https://dummyjson.com/auth/refresh';
//
//     it("Should refresh token", () => {
//         cy.fixture('token.json').then((data: { refreshToken: string }) => {
//             cy.request({
//                 method: "POST",
//                 url: apiUrl,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: { refreshToken: data.refreshToken },
//             }).then((response) => {
//                 expect(response.status).equals(200);
//                 const expectAccessToken = response.body.accessToken;
//                 const expectRefreshToken = response.body.refreshToken;
//
//                 expect(response.body).to.have.property("refreshToken", expectRefreshToken);
//                 expect(response.body).to.have.property("accessToken", expectAccessToken);
//
//                     cy.log(response.body);
//             })
//         })
//     })
// })

// Or:
describe("Refresh auth session", () => {
    const apiUrl = 'https://dummyjson.com/auth/refresh';

    it("Should refresh token", () => {
        cy.fixture('token.json').then((data: { refreshToken: string, accessToken: string }) => {
            cy.request({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { refreshToken: data.refreshToken },
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Controleer of de nieuwe tokens bestaan en niet leeg zijn
                expect(response.body).to.have.property("accessToken").and.not.be.empty;
                expect(response.body).to.have.property("refreshToken").and.not.be.empty;

                // Optioneel: Controleer dat de nieuwe accessToken niet gelijk is aan de oude
                expect(response.body.accessToken).to.not.eq(data.accessToken);
                expect(response.body.refreshToken).to.not.eq(data.refreshToken);

                // Optioneel: Valideer JWT-formaat (indien tokens JWT's zijn)
                expect(response.body.accessToken).to.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);

                cy.log(JSON.stringify(response.body));
            });
        });
    });
});
