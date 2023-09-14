import openai

# Initialize the OpenAI API
openai.api_key = "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"

# Text you want to send to the API
prompt = "Please write a nice recipe of the following ingredients: bacon, zucchini, potato. Recipe:"

# Make API request
response = openai.Completion.create(
    engine="text-davinci-003",  # text-davinci-003 is the name of the latest engine based on GPT-3
    prompt=prompt,
    max_tokens=1000
)

# Extract and print the generated text from the API response
generated_text = response.choices[0].text.strip()
print(f"Generated text: {generated_text}")
