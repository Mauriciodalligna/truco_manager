import { UserSeed } from "./userSeed";
import { MatchSeed } from "./matchSeed";

const seed = async () => {
  await UserSeed.seed();
  await MatchSeed.seed();
};

seed()
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
  });
