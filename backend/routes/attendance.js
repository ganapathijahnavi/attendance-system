const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");

function today() {
  return new Date().toISOString().slice(0, 10);
}

/* ------------------------
   CHECK-IN
------------------------- */
router.post("/checkin", auth, async (req, res) => {
  const user = req.user;
  const date = today();

  let record = await Attendance.findOne({ userId: user._id, date });

  if (record && record.checkInTime)
    return res.status(400).json({ message: "Already checked in" });

  const now = new Date().toISOString();

  if (!record) {
    record = new Attendance({
      userId: user._id,
      date,
      checkInTime: now,
    });
  } else {
    record.checkInTime = now;
  }

  await record.save();
  res.json({ message: "Checked in", record });
});

/* ------------------------
   CHECK-OUT
------------------------- */
router.post("/checkout", auth, async (req, res) => {
  const user = req.user;
  const date = today();

  const record = await Attendance.findOne({ userId: user._id, date });

  if (!record || !record.checkInTime)
    return res.status(400).json({ message: "Check-in not found" });

  if (record.checkOutTime)
    return res.status(400).json({ message: "Already checked out" });

  const now = new Date();
  const start = new Date(record.checkInTime);

  const hours = Math.round(((now - start) / 3600000) * 100) / 100;

  record.checkOutTime = now.toISOString();
  record.totalHours = hours;

  await record.save();
  res.json({ message: "Checked out", record });
});

/* ------------------------
   MY HISTORY
------------------------- */
router.get("/my-history", auth, async (req, res) => {
  try {
    const user = req.user;

    const records = await Attendance.find({ userId: user._id }).sort({
      date: -1,
    });

    res.json({ records });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------
   MY SUMMARY (monthly)
------------------------- */
router.get("/my-summary", auth, async (req, res) => {
  try {
    const user = req.user;

    const monthStart = new Date();
    monthStart.setDate(1);

    const startDate = monthStart.toISOString().slice(0, 10);

    const records = await Attendance.find({
      userId: user._id,
      date: { $gte: startDate },
    });

    const summary = {
      present: 0,
      absent: 0,
      totalHours: 0,
    };

    records.forEach((r) => {
      if (r.checkInTime) summary.present++;
      else summary.absent++;

      summary.totalHours += r.totalHours || 0;
    });

    res.json({ summary, records });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------
   MANAGER – ALL ATTENDANCE
------------------------- */
router.get("/all", auth, async (req, res) => {
  if (req.user.role !== "manager")
    return res.status(403).json({ message: "Access denied" });

  const records = await Attendance.find().populate(
    "userId",
    "name email employeeId department"
  );

  res.json({ records });
});

/* ------------------------
   MANAGER – TODAY STATUS
------------------------- */
router.get("/today-status", auth, async (req, res) => {
  if (req.user.role !== "manager")
    return res.status(403).json({ message: "Access denied" });

  const date = today();

  const records = await Attendance.find({ date }).populate(
    "userId",
    "name employeeId department"
  );

  res.json({ records });
});

module.exports = router;





// const express = require("express");
// const Attendance = require("../models/Attendance");
// const auth = require("../middleware/auth");

// const router = express.Router();

// function today() {
//   return new Date().toISOString().slice(0, 10);
// }

// // CHECK IN
// router.post("/checkin", auth, async (req, res) => {
//   const user = req.user;
//   const date = today();

//   let record = await Attendance.findOne({ userId: user._id, date });

//   if (record && record.checkInTime)
//     return res.status(400).json({ message: "Already checked in" });

//   const now = new Date().toISOString();

//   if (!record) {
//     record = new Attendance({
//       userId: user._id,
//       date,
//       checkInTime: now,
//     });
//   } else {
//     record.checkInTime = now;
//   }

//   await record.save();
//   res.json({ message: "Checked in", record });
// });

// // CHECK OUT
// router.post("/checkout", auth, async (req, res) => {
//   const user = req.user;
//   const date = today();

//   const record = await Attendance.findOne({ userId: user._id, date });

//   if (!record || !record.checkInTime)
//     return res.status(400).json({ message: "Check-in not found" });

//   if (record.checkOutTime)
//     return res.status(400).json({ message: "Already checked out" });

//   const now = new Date();
//   const start = new Date(record.checkInTime);

//   const hours = Math.round(((now - start) / 3600000) * 100) / 100;

//   record.checkOutTime = now.toISOString();
//   record.totalHours = hours;

//   await record.save();
//   res.json({ message: "Checked out", record });
// });

// module.exports = router;
