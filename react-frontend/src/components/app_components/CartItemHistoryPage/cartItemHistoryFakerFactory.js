
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
Id: faker.lorem.sentence(1),
VoucherId: faker.lorem.sentence(1),
UserId: faker.lorem.sentence(1),
Quantity: faker.lorem.sentence(1),
CompletedDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
