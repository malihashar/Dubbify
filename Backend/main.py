import os
from dotenv import load_dotenv # type: ignore
from supabase import create_client, Client # type: ignore

# Load environment variables from .env file
load_dotenv()

# Get the Supabase URL and Key from the environment variables
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    raise ValueError("Missing Supabase credentials. Please check your .env file.")

# Initialize the Supabase client
supabase: Client = create_client(url, key)

def main(): 
    print("Supabase client initialized successfully!")
    
    # Example: Fetch data from a table named 'users'
    # response = supabase.table('users').select("*").execute()
    # print(response.data)

if __name__ == "__main__":
    main()
