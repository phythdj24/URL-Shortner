const express = require("express");
const path = require('path')
const app = express();
const URL = require("./models/url");
const { connectTomongoDB } = require("./connect");



const urlRoute = require("./routes/url");
const staticRoute  = require("./routes/staticRouter")
const userRoute = require('./routes/user')



const PORT = 8001;

connectTomongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.set("view engine","ejs");
app.set('views', path.resolve('./views'))

app.use('/',staticRoute)
app.use("/user", userRoute);
app.use("/url", urlRoute);

app.use(express.json());
app.use(express.urlencoded({extended:false}))

// app.get("/test", async(req,res)=>{
//    const allUrls = await URL.find({});
//    return res.render("home",{
//     urls: allUrls,
//    })
// })




app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory:{
          timestamo: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl)
});

app.listen(PORT, () => console.log(`Server Staretd At PORT => ${PORT}`));
