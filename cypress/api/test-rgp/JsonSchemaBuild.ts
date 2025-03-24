// import Ajv, { JSONSchemaType } from 'ajv';
//
// const ajv = new Ajv();
//
// describe("Schema Validation", () => {
//     interface Character {
//         weapon: string;
//         upgradedWeapon: string;
//         armor: string;
//         upgradedArmor: string;
//         strength: number;
//         agility: number;
//         wisdom: number;
//         magic: number;
//     }
//
//     const thiefSchema: JSONSchemaType<Character> = {
//         $schema: "http://json-schema.org/draft-07/schema#",
//         type: "object",
//         properties: {
//             weapon: { type: "string" },
//             upgradedWeapon: { type: "string" },
//             armor: { type: "string" },
//             upgradedArmor: { type: "string" },
//             strength: { type: "integer" },
//             agility: { type: "integer" },
//             wisdom: { type: "integer" },
//             magic: { type: "integer" },
//         },
//         required: [
//             "weapon",
//             "upgradedWeapon",
//             "armor",
//             "upgradedArmor",
//             "strength",
//             "agility",
//             "wisdom",
//             "magic",
//         ],
//         additionalProperties: false,
//     };
//
//     it("Should validate the 'thief' object", () => {
//         cy.request({
//             method: "GET",
//             url: "https://test-rpg.vercel.app/api/builds",
//         }).then((response) => {
//             const validate = ajv.compile(thiefSchema);
//
//             // Validate only the thief object
//             expect(validate(response.body.thief)).to.be.true;
//
//             if (!validate(response.body.thief)) {
//                 console.error("Validation errors:", validate.errors);
//             }
//         });
//     });
// });


//OR for every thing:
import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

describe("Schema Validation", () => {

    interface Character {
        weapon: string;
        upgradedWeapon: string;
        armor: string;
        upgradedArmor: string;
        strength: number;
        agility: number;
        wisdom: number;
        magic: number;
    }

    interface BuildResponse {
        thief: Character;
        knight: Character;
        mage: Character;
        brigadier: Character;
    }

    const schema: JSONSchemaType<BuildResponse> = {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
            thief: {
                type: "object",
                properties: {
                    weapon: { type: "string" },
                    upgradedWeapon: { type: "string" },
                    armor: { type: "string" },
                    upgradedArmor: { type: "string" },
                    strength: { type: "integer" },
                    agility: { type: "integer" },
                    wisdom: { type: "integer" },
                    magic: { type: "integer" }
                },
                required: ["weapon", "upgradedWeapon", "armor", "upgradedArmor", "strength", "agility", "wisdom", "magic"],
                additionalProperties: false
            },
            knight: {
                type: "object",
                properties: {
                    weapon: { type: "string" },
                    upgradedWeapon: { type: "string" },
                    armor: { type: "string" },
                    upgradedArmor: { type: "string" },
                    strength: { type: "integer" },
                    agility: { type: "integer" },
                    wisdom: { type: "integer" },
                    magic: { type: "integer" }
                },
                required: ["weapon", "upgradedWeapon", "armor", "upgradedArmor", "strength", "agility", "wisdom", "magic"],
                additionalProperties: false
            },
            mage: {
                type: "object",
                properties: {
                    weapon: { type: "string" },
                    upgradedWeapon: { type: "string" },
                    armor: { type: "string" },
                    upgradedArmor: { type: "string" },
                    strength: { type: "integer" },
                    agility: { type: "integer" },
                    wisdom: { type: "integer" },
                    magic: { type: "integer" }
                },
                required: ["weapon", "upgradedWeapon", "armor", "upgradedArmor", "strength", "agility", "wisdom", "magic"],
                additionalProperties: false
            },
            brigadier: {
                type: "object",
                properties: {
                    weapon: { type: "string" },
                    upgradedWeapon: { type: "string" },
                    armor: { type: "string" },
                    upgradedArmor: { type: "string" },
                    strength: { type: "integer" },
                    agility: { type: "integer" },
                    wisdom: { type: "integer" },
                    magic: { type: "integer" }
                },
                required: ["weapon", "upgradedWeapon", "armor", "upgradedArmor", "strength", "agility", "wisdom", "magic"],
                additionalProperties: false
            }
        },
        required: ["thief", "knight", "mage", "brigadier"],
        additionalProperties: false
    };

    it("Should be a valid JSON schema against response", () => {
        cy.request({
            method: "GET",
            url: "https://test-rpg.vercel.app/api/builds"
        }).then((response) => {
            const validate = ajv.compile(schema);
            expect(validate(response.body)).to.be.true;

            if (!validate(response.body)) {
                console.error("Validation errors:", validate.errors);
            }
        });
    });
});
