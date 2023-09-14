import openai

# Initialize the OpenAI API
openai.api_key = "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"

def generate_recipe(json_object):
    # Extract information from JSON object
    ingredients = ", ".join(json_object['ingredients'])
    dietary_restrictions = json_object.get('dietary_restrictions', 'None')
    num_portions = json_object.get('number_of_portions', 4)

    # Create the prompt for the API
    prompt = f"Please write a recipe that includes the following ingredients: {ingredients}."
    if dietary_restrictions != 'None':
        prompt += f" The recipe should be suitable for someone with the following dietary restrictions: {dietary_restrictions}."
    prompt += f" The recipe should serve {num_portions} portions."
    prompt += " Recipe:"

    # Make API request
    response = openai.Completion.create(
        engine="text-davinci-003",  # text-davinci-003 is the name of the latest engine based on GPT-3
        prompt=prompt,
        max_tokens=1000
    )

    # Extract and return the generated text from the API response
    generated_text = response.choices[0].text.strip()
    return generated_text

# Example JSON object
recipe_info = {
    "ingredients": ["bacon", "zucchini", "potato"],
    "dietary_restrictions": "vegetarian",
    "number_of_portions": 4
}

# Generate and print recipe
generated_recipe = generate_recipe(recipe_info)
print(f"Generated Recipe:\n{generated_recipe}")