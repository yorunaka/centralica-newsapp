const express = require('express')
const axios = require('axios')
require('dotenv').config() 

const app = express()
const port = 5000

const cors = require('cors')
app.use(cors({
  origin: `*`,
  methods: 'GET,POST',
}))

app.get('/api/news', async (req, res) => {
  // const { category = 'indonesia' } = req.query
  const { category } = req.query
  const query = category && category.trim() !== '' ? category : 'indonesia';

  try {
    // console.log(process.env.NEWS_API_KEY ? 'loaded' : 'not loaded')
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: query,
        apiKey: process.env.NEWS_API_KEY,
      },
    })
    if (!response.data || !response.data.articles) {
      console.error("Unexpected response structure:", response.data)
      return res.status(500).json({ error: "Unexpected response structure from NewsAPI" })
    }
    const result = response.data.articles.filter(
      (article) =>
        article.title !== "[Removed]" &&
        article.description !== "[Removed]" &&
        article.author !== null &&
        article.title !== null &&
        article.url !== null
    )

    res.json({ articles: result })
  } catch (error) {
    console.error("Error fetching news data:", error.response?.data || error.message)
    res.status(500).json({ error: "Failed to fetch news data" })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})