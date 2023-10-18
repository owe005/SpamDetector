# Spam Detector

## Description

Another one of my side projects. In short, a user is able to copy-paste contents of an email they have received and have an AI model determine the legitimacy of the email. Alternatively, using `pytesseract`, the user is also able to upload an image of the email and have it analyzed as well.

## Directory Structure

```
.
|-- main.py
|-- app.py
|-- /templates
|   |-- index.html
|-- /static
|   |-- /css
|   |   |-- style.css
|   |-- /js
|   |   |-- script.js
|-- /pictures (Used for temporarily storing uploaded files)
```
> Note: The `config.py` file, which contains the API keys, is not included, duh..

## Setup and Installation

1. Clone the repository.

2. Install the required packages.

3. Create a `config.py` file in the root directory and add your openAI API key:

6. Start the application.

   ```bash
   python app.py
   ```

## Usage

1. Navigate to the provided link (typically `http://127.0.0.1:5000/`).
2. Pick either the image upload or text option.
3. Get it analyzed.
