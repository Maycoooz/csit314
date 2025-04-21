Windows
----------
1. Download/Clone the repo onto your computer
2. cd into backend folder
3. in the CLI input: python -m venv venv 
4. in the CLI input: .\venv\Scripts\Activate 
5  in the CLI input: python -m pip install -r requirements.txt 
6. cd back out into the main directory: cd ..
7. in the CLI input: uvicorn backend.main:app --reload

macOS
---------
1. Download/Clone the repo onto your computer
2. cd into backend folder
3. in the CLI input: python3 -m venv venv 
4. in the CLI input:  source venv/bin/activate 
5. in the CLI input: python3 -m pip install -r requirements.txt 
6. cd back out into the main directory: cd ..
7. in the CLI input: uvicorn backend.main:app --reload

It is now listening on port 8000
Can go to localhost:8000/docs to view in FastAPI Swagger UI to see the routes
