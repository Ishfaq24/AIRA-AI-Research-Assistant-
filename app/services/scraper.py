import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(topic: str) -> str:
    url = f"https://en.wikipedia.org/wiki/{topic.replace(' ', '_')}"

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return ""

    soup = BeautifulSoup(response.text, "html.parser")

    paragraphs = soup.find_all("p")

    text = " ".join([p.get_text().strip() for p in paragraphs if p.get_text().strip() != ""])

    return text