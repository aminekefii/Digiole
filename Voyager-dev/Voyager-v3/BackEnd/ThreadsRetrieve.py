import textwrap
from datetime import datetime
from openai import OpenAI

def main():
    # API key and thread ID
    api_key = ""
    thread_id = "thread_kPDSL4mhKUwRHvms1uNUFLFk"

    client = OpenAI(api_key=api_key)

    # Retrieve the thread details
    thread_details = client.beta.threads.retrieve(thread_id=thread_id)

    # Print the thread details
    print("Thread Details:")
    print(thread_details)

    # Retrieve the list of messages in the thread
    thread_messages = client.beta.threads.messages.list(thread_id=thread_id)

    # Print the messages in the thread
    print("\nThread Messages:")
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
            human_readable_timestamp = datetime.utcfromtimestamp(message.created_at).strftime('%Y-%m-%d %H:%M:%S UTC')

           # print(f"Message ID: {message.id}")
            #print(f"Timestamp: {message.created_at} ({human_readable_timestamp})")
           # print("-" * 50)  # Separator line for readability

if __name__ == "__main__":
    main()
