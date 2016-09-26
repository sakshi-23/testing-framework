# testing-framework

The application can be use to inspect JavaScript code and determine if certain aspects of their code is written as expected.

Some of the few testing APIs is supports:

1. A whitelist of specific functionality. For example, the ability to say "This program MUST use a 'for loop' and a 'variable declaration'."
2. A blacklist of specific functionality. For example, the ability to say "This program MUST NOT use a 'while loop' or an 'if statement'."
3. Determine the rough structure of the program. For example, "There should be a 'for loop' and inside of it there should be an 'if statement'."

 
To run:

1. cd app
2. python -m SimpleHTTPServer 8000 


Alternatively grunt serve

Url: https://cdn.rawgit.com/sakshi-23/testing-framework/master/app/index.html

Project description:
Features:
Ace Text Editor,
Test Results,
Test Setting ability


To write test cases for structure: Use space between each element 
e.g. Forstatement { Whilestatement }
