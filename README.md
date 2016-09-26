# testing-framework

The application can be use to inspect JavaScript code and determine if certain aspects of their code is written as expected.

Some of the few testing APIs is supports:

A whitelist of specific functionality. For example, the ability to say "This program MUST use a 'for loop' and a 'variable declaration'."
A blacklist of specific functionality. For example, the ability to say "This program MUST NOT use a 'while loop' or an 'if statement'."
Determine the rough structure of the program. For example, "There should be a 'for loop' and inside of it there should be an 'if statement'."

 
To run:
cd app
python -m SimpleHTTPServer 8000 


Alternatively grunt serve


Project description:
Features:
Ace Text Editor,
Test Results,
Test Setting ability


To write test cases for structure: Use space between each element 
e.g. Forstatement { Whilestatement }
