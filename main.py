from config import API_KEY
import openai
import cv2
import pytesseract

# Path to Tesseract-OCR executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

openai.api_key = API_KEY

context = "You are now an expert in Cybersecurity. As an expert in Cybersecurity, one of your jobs is to analyze emails and decide if the email is spam, phishing, or legitimate emails. If you are unable to confidently categorize the email, you avoid doing it and ask for more context. We define spam emails as not necessarily malicious, but often unwanted and something that keeps appearing. An email may be legitimate and spam at the same time. You will be given an email to look at. Your job is to differentiate what category(ies) this email belongs in: spam, phishing, legitimate. Provide reasoning for your assessment and conclude with the percentage confidence in your assessment. You should follow a strict response format. Which should look like this: \n\nLegitimacy: <spam, phishing or real/legitimate> \n\nReasoning: <reasoning> \n\nConfidence: <percentage confidence>"

# Function to get response from GPT-3
def get_response(prompt):
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=[{"role": "system", "content": context},
                                            {"role": "user", "content": prompt}])
    
    return response["choices"][0]["message"]["content"]

# Function to convert image to text
def convert_to_text(image):
    image = cv2.imread(image)
    text = pytesseract.image_to_string(image)

    # Check if the text has enough characters
    if len(text) < 10:
        return "The user has not included enough context for you to make a decision. Please tell the user that what was uploaded won't do. Please ask for more context."
    
    return text

