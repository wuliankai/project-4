const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();
const { authenticateToken } = require("../controllers/auth");
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

/**
 * flight_number String
 * airport String
terminal String
date_time DateTime
 */
router.post("/flight_data", authenticateToken, async (req, res) => {
  try {
    console.log("flight_data body=>", req.body);
    console.log("flight_data user=>", req.user);
    if (!req.user.is_admin) {
      res.status(403).json({ message: "Unauthorised to create flight data" });
    }

    const {
      home_flight_number,
      home_airport,
      home_terminal,
      home_date_time,
      dest_flight_number,
      dest_airport,
      dest_terminal,
      dest_date_time,
    } = req.body;

    const home_data = await prisma.flight_to_home_data.create({
      data: {
        flight_number: home_flight_number,
        airport: home_airport,
        terminal: home_terminal,
        date_time: home_date_time,
      },
    });

    const dest_data = await prisma.flight_to_dest_data.create({
      data: {
        flight_number: dest_flight_number,
        airport: dest_airport,
        terminal: dest_terminal,
        date_time: dest_date_time,
      },
    });

    const flight_data = await prisma.Flights_data.create({
      data: {
        dest_number: dest_data.flight_number,
        home_number: home_data.flight_number,
        group: 1,
      },
    });
    // res.json(user);
    res.status(200).json({ message: "Create success", created: flight_data });
  } catch (error) {
    console.error("Error creating flight data:", error);
    res.status(500).json({ error: "Unable to create flight data" });
  }
});

module.exports = router;
