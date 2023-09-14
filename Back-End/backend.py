from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/process_prompt', methods=['POST'])
def process_prompt():
    try:
        # Parse the JSON data sent from the frontend
        data = request.get_json()

        # Extract the 'ingredients' from the JSON data
        ingredients = data['ingredients']

        # Process the ingredients as needed, e.g., interact with OpenAI API
        # You can replace this with your actual processing logic

        # Return a response, which will be sent back to the frontend as JSON
        response = {'answer': 'This is the answer from the backend'}

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})