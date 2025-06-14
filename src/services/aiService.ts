
const GEMINI_API_KEY = 'AIzaSyAMvbtZW9rmmWsYPq5OKYdMnbOGSwhRc18';

interface AIResponse {
  content: string;
  author: string;
}

class AIService {
  private apiKey: string | null = GEMINI_API_KEY;
  private botUsername = 'RedditAI_Bot';

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateComment(postTitle: string, postContent: string): Promise<AIResponse> {
    // Gemini prompt to generate a relevant human-like comment
    const prompt = `You are a helpful, witty, and concise Reddit commenter (RedditAI_Bot) for this post:
Title: "${postTitle}"
Content: "${postContent}"
Write a short, relevant comment for this post.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Interesting perspective!";
      return {
        content: text,
        author: this.botUsername
      };
    } catch (error) {
      // fallback to mock responses if Gemini API call fails
      const responses = [
        "This is a fascinating topic! Thanks for sharing your insights.",
        "I agree with your perspective. This could have significant implications.",
        "Interesting point! Have you considered the potential challenges?",
        "Great post! This reminds me of similar developments in the field.",
        "Thanks for bringing this to our attention. Very thought-provoking!",
        "This is exactly the kind of discussion we need more of.",
        "Excellent analysis! I'd love to see more research on this topic.",
      ];
      return {
        content: responses[Math.floor(Math.random() * responses.length)],
        author: this.botUsername
      };
    }
  }

  async generatePost(): Promise<{ title: string; content: string; subreddit: string }> {
    // Gemini prompt to generate a trending Reddit post based on global topics
    const prompt = `Act as an agentic Reddit AI. Generate a timely, trending new Reddit post (title & short content) based on real-world events or internet news from the past week. Suggest one suitable major subreddit. Respond with:
Title:
Content:
Subreddit:`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      // Parse out Title, Content, Subreddit using simple splitting
      const titleMatch = text.match(/Title:\s*(.+)/i);
      const contentMatch = text.match(/Content:\s*(.+)/i);
      const subredditMatch = text.match(/Subreddit:\s*(.+)/i);
      return {
        title: titleMatch?.[1]?.trim() || "AI-generated Reddit Post",
        content: contentMatch?.[1]?.trim() || "This is an AI-generated post about a trending topic.",
        subreddit: subredditMatch?.[1]?.replace(/^r\//i, "")?.trim() || "news"
      };
    } catch (error) {
      // fallback to mock data if Gemini API call fails
      const topics = [
        {
          title: "AI breakthrough in natural language processing shows promising results",
          content: "Recent advances in transformer architecture have led to significant improvements in language understanding. This could revolutionize how we interact with AI systems.",
          subreddit: "technology"
        },
        {
          title: "New gaming engine promises better performance and graphics",
          content: "Developers are excited about this new rendering technology that could change the gaming industry. Early benchmarks show 40% performance improvements.",
          subreddit: "gaming"
        },
        {
          title: "Climate change research reveals unexpected findings",
          content: "Scientists have discovered new patterns in climate data that could help us better predict future changes. This research has important implications for policy.",
          subreddit: "science"
        }
      ];
      return topics[Math.floor(Math.random() * topics.length)];
    }
  }
}

export const aiService = new AIService();
