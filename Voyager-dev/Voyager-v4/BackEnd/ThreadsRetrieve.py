import textwrap
from openai import OpenAI
import sys
import json
import requests

def main(thread_id, user_id):
    # API key
    api_key = ""

    client = OpenAI(api_key=api_key)

    try:
        # Retrieve the thread details
        thread_details = client.beta.threads.retrieve(thread_id=thread_id)

        # Convert thread_details to a dictionary
        thread_details_dict = {
            "id": thread_details.id,
            "created_at": thread_details.created_at,
            "metadata": thread_details.metadata,
            "object": thread_details.object
        }

        # Retrieve the list of messages in the thread
        thread_messages = client.beta.threads.messages.list(thread_id=thread_id)

        # Prepare a list to store all messages
        all_messages = []

        # Gather all messages and their details
        for message in thread_messages.data:
            message_details = {
                "role": message.role,
                "content": [],
                "timestamp": message.created_at
            }
            for content in message.content:
                # Check if the content is a text message
                if content.type == 'text':
                    wrapped_text = textwrap.fill(content.text.value, width=120)
                    message_details["content"].append({"type": "text", "value": wrapped_text})
                # Check if the content is an image file
                elif content.type == 'file':
                    message_details["content"].append({"type": "file", "url": content.file.url})
            all_messages.append(message_details)

        # Prepare the data to send to the server
        data_to_send = {
            "threadId": thread_id,
            "userId": user_id,  # Pass user ID to the server
            "thread_details": thread_details_dict,  # Send thread details as a dictionary object
            "messages": all_messages
        }

        # Send the data to the server
        response = requests.post("http://localhost:3000/receive_messages", json=data_to_send)

        # Check if the request was successful
        if response.status_code == 200:
            print("py: Messages sent to the server successfully.")
        else:
            print(f"py: Error sending messages to the server. Status code: {response.status_code}")

    except Exception as e:
        print(f"py: Error retrieving thread details: {e}")

if __name__ == "__main__":
    # Check if the thread ID and user ID are provided as command-line arguments
    if len(sys.argv) != 3:
        print("Usage: python script.py <thread_id> <user_id>")
        sys.exit(1)

    # Extract the thread ID and user ID from the command-line arguments
    thread_id = sys.argv[1]
    user_id = sys.argv[2]

    # Call the main function with the provided thread ID and user ID
    main(thread_id, user_id)
