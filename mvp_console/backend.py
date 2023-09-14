import openai

# Initialize the OpenAI API
openai.api_key = "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"

### Minimal viable product (with terminal input) ###
ingredients = []
dietary_restrictions = ["none"]

while True:
    ingredient = input("Please write ingredients (enter 'done' to finish): ")
    if ingredient.lower() == "done":
        break
    ingredients.append(ingredient)

while True:
    restriction = input("Please enter any dietary restrictions (enter 'done' to finish): ")
    if restriction.lower() == "done":
        break
    dietary_restrictions.append(restriction)

ingredient_String = ", ".join(ingredients)
restriction_String = ", ".join(restriction)

# Create the prompt for the API
prompt = f"Please write a recipe that includes the following ingredients: {ingredients}."
if dietary_restrictions != 'None':
    prompt += f" The recipe should be suitable for someone with the following dietary restrictions: {dietary_restrictions}."
prompt += " Recipe:"

# Make API request
response = openai.Completion.create(
    engine="text-davinci-003",  # text-davinci-003 is the name of the latest engine based on GPT-3
    prompt=prompt,
    max_tokens=1000
)

# Extract and return the generated text from the API response
generated_recipe = response.choices[0].text.strip()

print(f"Generated Recipe:\n{generated_recipe}")