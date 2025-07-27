
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
Id: faker.lorem.sentence(1),
CategoryId: faker.lorem.sentence(1),
Points: faker.lorem.sentence(1),
Title: faker.lorem.sentence(1),
Image: faker.lorem.sentence(1),
Description: faker.lorem.sentence(1),
TermsAndCondition: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
