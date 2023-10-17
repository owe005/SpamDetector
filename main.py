from config import API_KEY
from converter import convert_to_text
import openai
import cv2
import pytesseract

# Path to Tesseract-OCR executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
openai.api_key = API_KEY

# Function for getting response from GPT-3 API based on user prompt (text)
def get_response(prompt):
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=[{"role": "system", "content": context},
                                            {"role": "user", "content": prompt}])
    
    return response["choices"][0]["message"]["content"]

# Function for getting text from image using Tesseract-OCR
def convert_to_text(image):
    image = cv2.imread(image)
    text = pytesseract.image_to_string(image)

    return text

