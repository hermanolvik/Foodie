# group-6
Socialt kontrakt för projektgrupp 6
https://docs.google.com/document/d/1x8QdunHEUfWWoGV40BNKZhHgLF4wtAidZKqEbXIcK2Y/edit?usp=sharing

Dagordning
https://docs.google.com/document/d/1LjOwwerTcHhVaNp7A_ZN2pURU9monKpAYVtsMDyLDUM/edit?usp=sharing

Project Scope
https://docs.google.com/document/d/1PmCGpc6AH234PUaX5dEEh44FI4PlxPoJEqNkFn5nh_g/edit?usp=sharing

Above is the necessary information to understand our work process

------------------------------------------------------------------------------------------------

In this section the code and the important files will be explained. This README is for an individual
who wants to learn or work on the code.

app.py:
The app.py file is for starting and running the program. This is a simple web application that 
generates recipes based on user input. Users can specify ingredients, dietary restrictions, 
measurement units, and number of portions to receive a custom recipe. The application utilizes 
the OpenAI API for text and image generation.

This Python script utilizes the OpenAI API to generate recipes based on user-provided ingredients 
and dietary restrictions. Users can input a list of ingredients and any dietary restrictions, and 
the script will generate a recipe incorporating those ingredients while considering the specified 
restrictions.

Dependencies:
Flask
OpenAI API (Ensure you have a valid API key)
Python 3.x

backend.py:



base.js:

This file is used as a base for all the .js pages. This means that what is implemented in base will be 
portrayed on all pages. Here we want to ensure that all pages have the dark mode and that it is stored 
between different pages

Rest of the .js files:

All .js files are created so that each page has its own .js files, due to the fact that each page needs
its own function/functions to operate correctly. Each .js file has on objective and that is to operate
only when needed and on the correct page. 

CSS files:

Like with the .js files each page has a css files this is just styling for the pages. Here we also have
a base.css witch all pages abide by. 

HTML files:

Like the .js and .css files the html files are created for each page with a base.html that translates
to all other .html files. All these files are for setting up the structure of the page.

