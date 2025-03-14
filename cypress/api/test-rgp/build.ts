describe("API test", () => {
    const apiUrl = "https://test-rpg.vercel.app/api/builds"

    it("Should return status 200 and a valid JSON response", () => {
        cy.request("GET", apiUrl).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an("object");
            cy.log(response.body);
            cy.log(JSON.stringify(response.body));
        })
    })

    it("Should contain the expected character classes", () => {
        cy.request("GET", apiUrl).then((response) => {
            expect(response.body).to.include.all.keys("thief", "knight", "mage", "brigadier");
        })
    })

    it("Check if values are within the correct range (0-6)", () => {
        cy.request("GET", apiUrl).then((response) => {
            const builds = response.body;
            Object.values(builds).forEach((character: any) => {
                expect(character.strength).to.be.within(0, 6);
                expect(character.agility).to.be.within(0, 6);
                expect(character.wisdom).to.be.within(0, 6);
                expect(character.magic).to.be.within(0, 6);
            })
        })
    })

    it(" Verify that weapons, armor, and upgrades are correctly assigned)", () => {
        cy.request("GET", apiUrl).then((response) => {
            const thief = response.body.thief;
            const knight = response.body.knight;
            const mage = response.body.mage;
            const brigadier = response.body.brigadier;

            expect(thief.weapon).to.equal("knife");
            expect(thief.upgradedWeapon).to.equal("katana");
            expect(thief.armor).to.equal("leather_armor");
            expect(thief.upgradedArmor).to.equal("silver_armor");

            // Check the knight's equipment
            expect(knight.weapon).to.equal("knife");
            expect(knight.upgradedWeapon).to.equal("longsword");
            expect(knight.armor).to.equal("partial_plate");
            expect(knight.upgradedArmor).to.equal("full_plate");

            // Check the mage's equipment
            expect(mage.weapon).to.equal("staff");
            expect(mage.upgradedWeapon).to.equal("staff");
            expect(mage.armor).to.equal("cloak");
            expect(mage.upgradedArmor).to.equal("silver_armor");

            // Check the brigadier's equipment
            expect(brigadier.weapon).to.equal("bronze_mace");
            expect(brigadier.upgradedWeapon).to.equal("hammer");
            expect(brigadier.armor).to.equal("brigadier_armor");
            expect(brigadier.upgradedArmor).to.equal("silver_armor");

            //     OR
            //     cy.request("GET", apiUrl).then((response) => {
            //         const { thief, knight, mage, brigadier } = response.body;
            //
            //         expect(thief).to.deep.include({
            //             weapon: "knife",
            //             upgradedWeapon: "katana",
            //             armor: "leather_armor",
            //             upgradedArmor: "silver_armor"
            //         });

        })
    })

    it("Ensure that invalid requests return appropriate error responses", () => {
        cy.request({
            method: "GET",
            url: `${apiUrl}/1`,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(404);
                if (typeof response.body === "string") {
                    expect(response.body).to.include("This page could not be found");
                } else {
                    expect(response.body).to.have.property("error", "This page could not be found");
                }
            })
    })
})