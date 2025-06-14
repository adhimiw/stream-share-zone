
interface AIResponse {
  content: string;
  author: string;
}

class AIService {
  private apiKey: string | null = null;
  private botUsername = 'RedditAI_Bot';

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateComment(postTitle: string, postContent: string): Promise<AIResponse> {
    // Mock AI responses for now - replace with actual AI API call
    const responses = [
      "This is a fascinating topic! Thanks for sharing your insights.",
      "I agree with your perspective. This could have significant implications.",
      "Interesting point! Have you considered the potential challenges?",
      "Great post! This reminds me of similar developments in the field.",
      "Thanks for bringing this to our attention. Very thought-provoking!",
      "This is exactly the kind of discussion we need more of.",
      "Excellent analysis! I'd love to see more research on this topic.",
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      author: this.botUsername
    };
  }

  async generatePost(): Promise<{ title: string; content: string; subreddit: string }> {
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

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return topics[Math.floor(Math.random() * topics.length)];
  }
}

export const aiService = new AIService();
