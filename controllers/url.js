const shortid = require("shortid");
const URL = require("../models/url");

async function handlegenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is requrired" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render('home',{
    id: shortID,
  })
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

// const handlegenerateNewShortUrl = async(req, res)=>{
//     const body = req.body;
//     if(!body.url) return res.status(400).json({error: 'url is requrired'})
//           const shortID = shortid()
//           await URL.create({
//             shortId: shortID,
//             redirectURL: body.url,
//             visitedHistory:[],
//           })

//           return res.json({id: shortID})

// }

module.exports = {
  handlegenerateNewShortUrl,
  handleGetAnalytics,
};
