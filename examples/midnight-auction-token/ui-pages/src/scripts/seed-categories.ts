import { db } from "@/server/db";
import { auctions } from "@/server/db/schema";

const categoryNames = [
  {
    title: "Rustic Country Estate",
    description:
      "A serene countryside estate with 5 acres of land, a horse stable, and a picturesque mountain backdrop.",
    estimate: "10,000 tBID - 15,000 tBID",
    highestBid: 10000,
    deadline: new Date("2023-12-31T23:59:59Z"),
    imageUrl: "/sample-4.jpg",
  },
  {
    title: "Modern Villa with Ocean View",
    description:
      "A serene countryside estate with 5 acres of land, a horse stable, and a picturesque mountain backdrop.",
    estimate: "10,000 tBID - 15,000 tBID",
    highestBid: 10000,
    deadline: new Date("2023-12-31T23:59:59Z"),
    imageUrl: "/sample-2.jpg",
  },
  {
    title: "Luxury Penthouse in City Center",
    description:
      "A serene countryside estate with 5 acres of land, a horse stable, and a picturesque mountain backdrop.",
    estimate: "10,000 tBID - 15,000 tBID",
    highestBid: 10000,
    deadline: new Date("2023-12-31T23:59:59Z"),
    imageUrl: "/sample-1.jpg",
  },
  {
    title: "Rustic Country Estate",
    description:
      "A serene countryside estate with 5 acres of land, a horse stable, and a picturesque mountain backdrop.",
    estimate: "10,000 tBID - 15,000 tBID",
    highestBid: 10000,
    deadline: new Date("2023-12-31T23:59:59Z"),
    imageUrl: "/sample-4.jpg",
  },
  {
    title: "Rustic Country Estate",
    description:
      "A serene countryside estate with 5 acres of land, a horse stable, and a picturesque mountain backdrop.",
    estimate: "10,000 tBID - 15,000 tBID",
    highestBid: 10000,
    deadline: new Date("2023-12-31T23:59:59Z"),
    imageUrl: "/sample-4.jpg",
  },
];

const main = async () => {
  try {
    console.log("Seeding categories...");
    await db.insert(auctions).values(categoryNames);
    console.log("Categories seeded.");
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};

main();
