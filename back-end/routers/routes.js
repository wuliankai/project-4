const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { auth } = require("../middleware/auth");

const prisma = new PrismaClient();
const router = express.Router();
const { auth1 } = require("../controllers/auth");

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const user = await prisma.user.create({
      data: {
        name: name,
        phone_number: parseInt(phoneNumber),
      },
    });
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Unable to create user" });
  }
});

// Read all users
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Unable to retrieve users" });
  }
});

// Read a single user
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Unable to retrieve user" });
  }
});

// Update a user
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        phoneNumber,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Unable to update user" });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Unable to delete user" });
  }
});

// Create a new group
router.post("/groups", async (req, res) => {
  try {
    const { creator_id, members } = req.body;
    const group = await prisma.groups.create({
      data: {
        group_creator: {
          connect: {
            phoneNumber: creator_id,
          },
        },
        members: {
          connect: members.map((member) => ({ phoneNumber: member })),
        },
      },
    });
    res.json(group);
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Unable to create group" });
  }
});

// Read all groups
router.get("/groups", async (req, res) => {
  try {
    const groups = await prisma.groups.findMany();
    res.json(groups);
  } catch (error) {
    console.error("Error retrieving groups:", error);
    res.status(500).json({ error: "Unable to retrieve groups" });
  }
});

// Read a single group
router.get("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await prisma.groups.findUnique({
      where: {
        group_id: parseInt(id),
      },
    });
    res.json(group);
  } catch (error) {
    console.error("Error retrieving group:", error);
    res.status(500).json({ error: "Unable to retrieve group" });
  }
});

// Update a group
router.put("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { creator_id, members } = req.body;
    const updatedGroup = await prisma.groups.update({
      where: {
        group_id: parseInt(id),
      },
      data: {
        group_creator: {
          connect: {
            phone_number: creator_id,
          },
        },
        members: {
          set: members.map((member) => ({ phone_number: member })),
        },
      },
    });
    res.json(updatedGroup);
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ error: "Unable to update group" });
  }
});

// Delete a group
router.delete("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.groups.delete({
      where: {
        group_id: parseInt(id),
      },
    });
    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ error: "Unable to delete group" });
  }
});

//Create new exchange rate
router.post("/exchange_rate", async (req, res) => {
  try {
    const { exchange_rate } = req.body;
    await prisma.exchange_rate.create({
      data: {
        exchange_rate: exchange_rate,
      },
    });
    res.json("Exchange rate saved!");
  } catch (error) {
    console.error("Error creating exchange rate", error);
    res.status(500).json({ error: "Unable to create exchange rate" });
  }
});

//Get exchange rate info
router.get("/exchange_rate", async (req, res) => {
  try {
    const exchange_rate = await prisma.exchange_rate.findMany({
      orderBy: {
        id: "desc",
      },
      take: 1,
    });
    res.json(exchange_rate);
  } catch (error) {
    console.error("Error getting exchange rate", error);
    res.status(500).json({ error: "Unable to create getting exchange rate" });
  }
});

//create new hotel data
router.post("/hotel_data", async (req, res) => {
  try {
    const { hotelName, hotelLocation } = req.body;
    await prisma.hotel_data.create({
      data: {
        location: hotelLocation,
        name: hotelName,
      },
    });
    res.json("Hotel data saved!");
  } catch (error) {
    console.error("Error creating hotel data", error);
    res.status(500).json({ error: "Unable to create hotel data" });
  }
});

//Get hotel data
router.get("/hotel_data", async (req, res) => {
  try {
    const hotelData = await prisma.hotel_data.findMany({
      orderBy: {
        id: "desc",
      },
      take: 1,
    });
    res.json(hotelData);
  } catch (error) {
    console.error("Error getting hotel data", error);
    res.status(500).json({ error: "Unable to create getting hotel data" });
  }
});

//Create new flight to home data
router.post("/flight_to_home_data", async (req, res) => {
  try {
    const { toHomeFlightNumber, toHomeFlightAirport, toHomeFlightDateAndTime } =
      req.body;
    await prisma.flight_to_home_data.create({
      data: {
        flight_number: toHomeFlightNumber,
        airport: toHomeFlightAirport,
        date_time: toHomeFlightDateAndTime,
      },
    });
    res.json("Flight to home saved!");
  } catch (error) {
    console.error("Error creating flight to home data", error);
    res.status(500).json({ error: "Unable to create flight to home data" });
  }
});

//Get flight to home data
router.get("/flight_to_home_data", async (req, res) => {
  try {
    const flight_to_home = await prisma.flight_to_home_data.findMany({
      orderBy: {
        id: "desc",
      },
      take: 1,
    });
    res.json(flight_to_home);
  } catch (error) {
    console.error("Error getting flight to home data", error);
    res.status(500).json({ error: "Unable to get flight to home data" });
  }
});

module.exports = router;
