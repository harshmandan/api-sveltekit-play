const inspirationalQuoteHost =
  "https://api.quotable.io/quotes?limit=1&tags=inspirational";
const dadJokeHost = "https://icanhazdadjoke.com";

export async function getInspirationalQuote(): Promise<string> {
  try {
    const req = await fetch(inspirationalQuoteHost);
    const res = await req.json();
    return res.results[0].content as string;
  } catch (e) {
    console.error(e);
    return "";
  }
}

export async function getDadJoke(): Promise<string> {
  try {
    const req = await fetch("https://icanhazdadjoke.com", {
      headers: {
        Accept: "application/json",
      },
    });
    const res = await req.json();
    return res.joke;
  } catch (e) {
    console.error(e);
    return "";
  }
}
