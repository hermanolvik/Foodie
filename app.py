import io
from urllib.parse import urljoin, unquote
import openai
from flask import Flask, render_template, request, jsonify, send_file
import smtplib
from email.mime.text import MIMEText
import re
import requests
from bs4 import BeautifulSoup
from PIL import Image, ImageDraw, ImageFont, ImageOps
from io import BytesIO

# Initialize the OpenAI API
openai.api_key = "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"

# Initialize Flask
app = Flask(__name__, static_folder='static')

# Initialize kitchens
kitchens = [
    'All',
    'Sweden',
    'Greece',
    'England',
    'Italy'
    'India'
]

# Intitialize portions

portions = range(1, 8)

# Initialize dietary restrictions

restrictions = [
    'Lactose', 
    'Gluten', 
    'Vegetarian', 
    'Vegan', 
    'Pescetarian',
    'Kosher',
    'Keto',
    'Fish Allergy',
    'Nut Allergy',
    'Egg Allergy',
    'Soy Allergy',
    'Fruitarian'
]

def send_email(subject, body, sender, recipients, password):
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = ', '.join(recipients)
    with smtplib.SMTP('smtp.office365.com', 587) as server:
       
        server.starttls()
        server.login(sender, password)
        server.sendmail(sender, [recipients], msg.as_string())
        server.quit()
    print("Message sent!")

def parse_recipe(generated_text):
    # Initialize empty dictionary to store recipe components
    recipe_json = {'title': '', 'ingredients': '', 'instructions': ''}

    # Try to separate out the title, ingredients, and instructions
    lines = generated_text.split('\n')
    if lines:
        recipe_json['title'] = lines[0]
        rest = lines[1:]

        ingredients = []
        instructions = []
        current_section = None
        for line in rest:
            if re.search(r'Ingredients:', line, re.I):
                current_section = 'ingredients'
            elif re.search(r'Instructions:', line, re.I):
                current_section = 'instructions'

            if current_section == 'ingredients':
                ingredients.append(line)
            elif current_section == 'instructions':
                instructions.append(line)

        recipe_json['ingredients'] = '\n'.join(ingredients)
        recipe_json['instructions'] = '\n'.join(instructions)

    return recipe_json

def generate_recipe(json_object):
    # Extract information from JSON object
    ingredients = ", ".join(json_object['ingredients'])
    dietary_restrictions = json_object.get('dietary_restrictions', 'None')
    num_portions = json_object.get('number_of_portions', 4)
    measurement_unit = json_object.get('measurement_unit', 'metric (do not use cups, only metric units)')
    int_kitchens = json_object.get('intKitchens', 'All')

    # Create the prompt for the API
    prompt = f"Please write a recipe that includes the following ingredients: {ingredients}. Very important; if the ingredient is not a food, ignore it!"
    if dietary_restrictions != 'None':
        prompt += f" The recipe should be suitable for someone with the following dietary restrictions: {dietary_restrictions}."
    prompt += f" The recipe should use explicitly {measurement_unit} measurement units and no other type of units."
    prompt += f" The recipe should serve {num_portions} portions. "
    if int_kitchens != 'All':
        prompt += f" Restrict to recepies from {int_kitchens}."
    prompt += " Recipe:"

    # Make API request
    response = openai.Completion.create(
        engine="text-davinci-003",  # text-davinci-003 is the name of the latest engine based on GPT-3
        prompt=prompt,
        max_tokens=1000
    )

    # Extract and return the generated text from the API response
    generated_text = response.choices[0].text.strip()

    # Parse the recipe text
    parsed_recipe = parse_recipe(generated_text)
    return parsed_recipe


def generate_recipe_image(title):
    response = openai.Image.create(
        prompt="a delicious and beautiful serving of the following recipe: " + title,
        n=1,
        size="256x256"
    )
    global image_url
    image_url = response['data'][0]['url']


@app.route("/")
@app.route("/home")
def main():
    # path = os.path.join(os.path.dirname(__file__), 'Front-End', 'main.html')
    return render_template('main.html', kitchens = kitchens, restrictions = restrictions, portions = portions)


@app.route('/recipe')
def recipe():
    title = request.args.get("title")
    ingredients = request.args.get('ingredients')
    instructions = request.args.get('instructions')
    recipe_image_url = image_url
    return render_template('recipe.html', title=title, ingredients=ingredients, instructions=instructions, recipe_image_url=recipe_image_url)


@app.route('/page_2')
def page_2():
    return render_template('page2.html')


@app.route('/page_3')
def page_3():
    return render_template('page3.html')


@app.route('/process_prompt', methods=['POST'])
def process_prompt():
    json_object = request.json
    recipe = generate_recipe(json_object)
    #generate the image here so that we dont get a new image each time we refresh
    generate_recipe_image(recipe.get('title'))
    return jsonify(recipe)

@app.route('/send_email', methods=['POST'])
def handle_email_submission():
    if request.method == 'POST':
        recipient_email = request.form['userEmail']
        subject = "Contact Form Submission"
        message = request.form['userMessage']
        thank_you_message = "Thank you for your feedback, our team will respond shortly"
        sender_email = "foodie.app@outlook.com"  # Your email address
        password = "bdgkrknqgthqgeih"  # Your email password

        recipients = [recipient_email]
        message += f"\n\nContact customer: {', '.join(recipients)}"

        try:
            send_email("noReply", thank_you_message, sender_email, recipients, password)
            send_email(subject, message, sender_email, [sender_email], password)
            return "Email sent successfully!"
        except Exception as e:
            return f"Error: {str(e)}"



#@app.route('/create_image', methods=['GET'])
def create_image(url):
    # URL of the webpage you want to scrape
    #url = request.args.get('url')
    # Send an HTTP GET request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract text from specific elements (e.g., <h1> and <p>)
        title_text = soup.find('h1').get_text()
        ingredients_text = soup.find(id='IngredientsId')
        instructions_text = soup.find(class_='instructions')

        ingredients = ingredients_text.get_text() if ingredients_text else "Ingredients not found"
        instructions = instructions_text.get_text() if ingredients_text else "Instructions not found"

        img_tag = soup.find('img', id='recipe-image')
        img_logo = soup.find('img', id='logo-image')

        if img_tag:
            img_url = img_tag.get('src')
            img_url = urljoin(url, img_url)

            img_logo_url = img_logo.get('src')
            img_logo_url = urljoin(url, img_logo_url)

            # Send an HTTP GET request for the image
            img_response = requests.get(img_url)
            img_logo_response = requests.get(img_logo_url)

            # Check if the image download was successful
            if img_response.status_code == 200:

                bordered_image = Image.new('RGB', (1300, 750), color='white')

                # Create an image with the extracted text
                image = Image.new('RGB', (600, 600), (255, 157, 130))
                draw = ImageDraw.Draw(image)
                # font = ImageFont.load_default()

                # Set the text color and size
                text_color = 'black'

                title_font = ImageFont.truetype('arial.ttf', 35)
                ingredients_font = ImageFont.truetype('arial.ttf', 20)
                instructions_font = ImageFont.truetype('arial.ttf', 20)

                title_pos = (20, 20)
                ingredients_pos = (20, 50)
                instructions_pos = (200, 200)

                draw.text(title_pos, title_text, fill=text_color, font=title_font)
                draw.text(ingredients_pos, ingredients, fill=text_color, font=ingredients_font, spacing=-2)
                # draw.text(instructions_pos, instructions, fill=text_color, font=instructions_font)

                # Open and paste the downloaded image onto the generated image
                img = Image.open(BytesIO(img_response.content))
                resized_img = img.resize((600, 600))
                bordered_image.paste(resized_img, (650, 100))  # Adjust the position as needed

                img_logo = Image.open(BytesIO(img_logo_response.content))
                img_logo = img_logo.convert('RGBA')
                resized_logo = img_logo.resize((209, 64))
                bordered_image.paste(resized_logo, (550, 20), resized_logo)

                bordered_image.paste(image, (50, 100))

                # Save the image for debugging
                #bordered_image.save('share_image.png')

                img_io = io.BytesIO()
                bordered_image.save(img_io, 'PNG')
                img_io.seek(0)

                return img_io

            else:
                print(f"Failed to download image from {img_url}")
        else:
            print("Image not found on the webpage.")
    else:
        print("Failed to retrieve the webpage. Status code:", response.status_code)


@app.route('/download_image')
def download_image():
    # Generate the image
    img_io = create_image(request.args.get('url'))

    # Send the image as a response
    return send_file(img_io, as_attachment=True, download_name='generated_image.png')


if __name__ == '__main__':
    app.run(debug=True)


