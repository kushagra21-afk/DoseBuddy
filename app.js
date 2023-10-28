const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const medsRoute = require("./routes/meds");
const schedule = require("node-schedule");
const sendMail = require("./mail");
const mongodb = require("mongodb")
const Medicine = require("./models/Meds");
dotenv.config({path: "./vars/.env"});
const User = require("./models/User");
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
    
  }
);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/meds", medsRoute);

// everytime its 1 minute for eg: 8:01,9:01 function gets excecuted to keep up for any updates in dosage time
const job = schedule.scheduleJob('1 * * * *', function(){
  hey()
});
//sends mail
async function hey(){
 
  const meds = await Medicine.find()
meds.forEach((medication) => {
  medication.times.forEach((time) => {
    var times = time.split(":")
    var a=times[0]
    var b=times[1]
    schedule.scheduleJob(`${b} ${a} * * *`, async () => {
      // Send a notification to the user reminding them to take their medication
      const user = await User.findById(medication.userId)
      console.log(user)
      console.log(user.email)
     sendMail(user.email, 'Medication Reminder', `It's time to take your ${medication.name}!`);
    });
  });  
});
}
app.listen(8800, () => {
  console.log("Backend server is running!");
});