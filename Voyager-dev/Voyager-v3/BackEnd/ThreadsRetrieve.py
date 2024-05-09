import textwrap
from datetime import datetime, timezone
from openai import OpenAI

def main(thread_id):
    # API key
    api_key = ""

    client = OpenAI(api_key=api_key)

    try:
        # Retrieve the thread details
        thread_details = client.beta.threads.retrieve(thread_id=thread_id)

        # Convert Unix timestamp to a human-readable format
        thread_creation_timestamp = datetime.fromtimestamp(thread_details.created_at, timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')

        # Print the thread details
        print("Thread Details:")
        print(f"Thread ID: {thread_details.id}")
        print(f"Creation Timestamp: {thread_details.created_at} ({thread_creation_timestamp})")
        print()

        # Retrieve the list of messages in the thread
        thread_messages = client.beta.threads.messages.list(thread_id=thread_id)

        # Print the messages in the thread
        print("Thread Messages:")
        print()
        for message in thread_messages.data:
            for content in message.content:
                # Check if the content is a text message
                if content.type == 'text':
                    wrapped_text = textwrap.fill(content.text.value, width=120)
                    print(f"Role: {message.role}, Content: {wrapped_text}\n")
                # Check if the content is an image file
                elif content.type == 'file':
                    print(f"Role: {message.role}, File URL: {content.file.url}\n")
                    # Here you can add code to download the image or display it in a suitable manner

            # Convert Unix timestamp to a human-readable format
            human_readable_timestamp = datetime.fromtimestamp(message.created_at, timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')

            # Print message details
            print(f"Message ID: {message.id}")
            print(f"Timestamp: {message.created_at} ({human_readable_timestamp})")
            print("-" * 50)  # Separator line for readability
    except Exception as e:
        print(f"Error retrieving thread details: {e}")

if __name__ == "__main__":
    # Example usage:
    thread_id = "your_thread_id_here"
    main(thread_id)
