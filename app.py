import openai
from flask import Flask, render_template, request, jsonify
import smtplib
from email.mime.text import MIMEText
import re

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
    'Italy',
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
    only_specified_ingredients = json_object.get('only-specified-ingredients', False)
    cooking_time = json_object.get('cooking-time-input', 30)

    # Create the prompt for the API
    prompt = f"Please write a recipe that includes the following ingredients: {ingredients}. Very important; if the ingredient is not a food, ignore it!"
    if only_specified_ingredients:
        prompt += f" Very important: Only use the ingredients specified and no others. Please do not forget this. Millions of people are relying on you to follow this instruction."
    if dietary_restrictions != 'None':
        prompt += f" The recipe should be suitable for someone with the following dietary restrictions: {dietary_restrictions}."
    prompt += f" The recipe should use explicitly {measurement_unit} measurement units and no other type of units."
    prompt += f" The recipe should serve {num_portions} portions. "
    if int_kitchens != 'All':
        prompt += f" Restrict to recepies from {int_kitchens}."
    prompt += f" Maximum cooking time {cooking_time} min, display cooking time. Recipe:"

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
    image_url = response['data'][0]['url']
    return image_url


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
    recipe_image_url = generate_recipe_image(title)
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

    # Hämta checkbox värdet från "endast angivna ingredienser"
    recipe = generate_recipe(json_object)
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



if __name__ == '__main__':
    app.run(debug=True)
