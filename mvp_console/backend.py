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


print(f"Generated Recipe:\n{generated_recipe}")