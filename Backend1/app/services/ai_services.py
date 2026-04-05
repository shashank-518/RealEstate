import os
import json
from dotenv import load_dotenv
from google import genai

from app.routes.prompt import MASTER_PROMPT

# Load env variables
load_dotenv()

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


async def generate_ai_response(user_input: str):
    try:
        # 🔥 Inject user input into prompt
        full_prompt = MASTER_PROMPT.replace("{user_input}", user_input)

        # 🔥 Call Gemini
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )

        text = (response.text or "").strip()

        # ❌ Handle empty response
        if not text:
            return {
                "error": "Empty response from model",
                "message": "AI failed"
            }

        # 🔥 Remove markdown ```json ```
        if text.startswith("```"):
            parts = text.split("```")
            if len(parts) >= 2:
                text = parts[1]
                if text.startswith("json"):
                    text = text[4:]

        text = text.strip()

        # 🔥 Try parsing JSON
        try:
            return json.loads(text)

        except json.JSONDecodeError:
            return {
                "error": "Invalid JSON from model",
                "raw_output": text
            }

    except Exception as e:
        return {
            "error": str(e),
            "message": "AI failed to generate response"
        }