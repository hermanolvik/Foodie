import unittest
from unittest.mock import patch, Mock
from app import app, generate_recipe, parse_recipe

class TestFlaskApp(unittest.TestCase):

    def setUp(self):
        # Create a test client using Flask's test_client method
        self.app = app.test_client()
    @patch('app.openai.Completion.create')
    def test_generate_recipe(self, mock_openai_completion):
        mock_response = Mock()
        mock_choice = Mock()
        mock_choice.text = "Recipe Title\ningredients:\n- potato\n- beef\ninstructions:\n1. Step 1\n2. Step 2"
        mock_response.choices = [mock_choice]
        mock_openai_completion.return_value = mock_response

        response = self.app.post('/process_prompt', json={
            'ingredients': ['potato', 'beef'],
            'dietary_restrictions': 'None',
            'number_of_portions': 2,
            'measurement_unit': 'metric',
            'intKitchens': 'All'
        })

        self.assertEqual(response.status_code, 200)

        # Parse the response JSON
        recipe = response.get_json()

        # Check if the parsed recipe matches the expected values
        self.assertEqual(recipe['title'], "Recipe Title")
        self.assertEqual(recipe['ingredients'], "ingredients:\n- potato\n- beef")
        self.assertEqual(recipe['instructions'], "instructions:\n1. Step 1\n2. Step 2")

    def test_parse_recipe(self):
        # Test parsing a sample recipe text
        recipe_text = "Recipe Title\ningredients:\n- potato\n- beef\ninstructions:\n1. Step 1\n2. Step 2"
        parsed_recipe = parse_recipe(recipe_text)

        self.assertEqual(parsed_recipe['title'], "Recipe Title")
        self.assertEqual(parsed_recipe['ingredients'], 'ingredients:\n- potato\n- beef')
        self.assertEqual(parsed_recipe['instructions'], 'instructions:\n1. Step 1\n2. Step 2')


if __name__ == '__main__':
    unittest.main()