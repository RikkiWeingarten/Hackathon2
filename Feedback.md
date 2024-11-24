Rikki,  

First of all, great idea! I’m really pleased to see you putting effort into finding a strong concept for your projects.  

A few words about the code quality — it’s good, and the amount of code you’ve written for one person is very impressive.  

Here are a couple of suggestions for improvement:
- **Querying data from the database:**  
  When querying the database, it’s generally a good practice to wrap the logic in a `try/catch` block. Database operations often produce errors, and while you can catch them at the controller level, doing so may not be as obvious and could break the levels of abstraction. This may not be crucial for a small project, but in a larger one, it could save you a lot of trouble.  

- **File handling:**  
  In this project, you can practice file handling. Storing files in a database is usually not ideal. Instead, you could explore using a third-party service for file storage or even store files in the filesystem, taking all necessary precautions.  

Overall, excellent work, and I’m excited to see how you continue to develop your skills!  
