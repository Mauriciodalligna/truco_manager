import { appDataSource } from "../data-source";
import { User } from "../entities/user"
import { faker } from "@faker-js/faker"

export class UserSeed {
    public static async seed(): Promise<void> {
        if (!appDataSource.isInitialized) {
            await appDataSource.initialize();
        }
        
        const userRepository = appDataSource.getRepository(User)
        const userCount = 100;
        for (let i = 0; i < userCount; i++) {
            const user = userRepository.create({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: i,
            });
            await userRepository.save(user);
        }
        console.log("Users seeded successfully with Faker data!");
    }
}