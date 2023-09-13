import openai

# Initialize the OpenAI API
openai.api_key = "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"

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

#T ext you want to send to the API
prompt = f"Please write a nice recipe of the ingredients: {ingredient_String},restrict recipes to: {restriction_String}"

# Make API request
response = openai.Completion.create(
    engine="text-davinci-003",  # text-davinci-003 is the name of the latest engine based on GPT-3
    prompt=prompt,
    max_tokens=1000
)