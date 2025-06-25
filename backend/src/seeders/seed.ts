import { UserSeed } from "./userSeed";

const seed = async () => {
    await UserSeed.seed();
};

seed()
    .then(() => {
        console.log("Seeding completed successfully.");
    })
    .catch((error) => {
        console.error("Seeding failed:", error);
    });