const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { HfInference } = require("@huggingface/inference");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const news = process.env.apiKey;
app.use(express.json());

app.get("/analyze", async (req, res) => {
    const { keyword} = req.query;

    if (!keyword || !news) {
        return res.status(400).json({ error: "Keyword and API key are required." });
    }

    try {
        const newsUrl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${news}`;
        const response = await axios.get(newsUrl);
        const articles = response.data.articles || [];

        if (articles.length === 0) {
            return res.status(404).json({ error: "No relevant articles found." });
        }

        let totalScore = 0;
        let numArticles = 0;
        let analyzedArticles = [];

        for (const article of articles) {
            const description = article.description;
            if (!description) continue;

            const sentiment = await hf.textClassification({
                model: "ProsusAI/finbert",
                inputs: description,
            });

            const sentimentLabel = sentiment[0].label;
            const score = sentiment[0].score * (sentimentLabel === "positive" ? 1 : -1);

            totalScore += score;
            numArticles++;

            analyzedArticles.push({
                title: article.title,
                url: article.url,
                publishedAt: article.publishedAt,
                description: description,
                sentiment: sentimentLabel,
                score: score.toFixed(2),
            });
        }

        const finalScore = totalScore / numArticles;
        const overallSentiment = finalScore > 0.15 ? "Positive" : finalScore < -0.15 ? "Negative" : "Neutral";

        res.json({
            overall_sentiment: overallSentiment,
            final_score: finalScore.toFixed(2),
            num_articles: numArticles,
            analyzed_articles: analyzedArticles,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching news or analyzing sentiment." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});