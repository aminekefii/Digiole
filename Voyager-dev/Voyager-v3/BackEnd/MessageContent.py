import sys
import json
import subprocess

def process_message_content(assistant_response, annotations):
    # Initialize a variable to store the first file ID
    file_id = None
    file_txt= None
    # Collect the first file ID from annotations
    if annotations:
        file_id = annotations[0]['file_path']['file_id']
        file_txt= annotations[0]['text']
    # Append file ID to the response if there is any
    if file_id:
        assistant_response += f"\nFile ID: {file_id}"
    
    return assistant_response, file_id

def main():
    # Assuming the JSON string is passed as the first command-line argument
    args_json = sys.argv[1]
    args = json.loads(args_json)
    
    assistant_response = args['assistantResponse']
    annotations = args['annotations']

    # Process the message content
    processed_message_content, file_id = process_message_content(assistant_response, annotations)
    print(processed_message_content)

    # Call the second script to download the file if file ID is available
    if file_id:
        subprocess.run(['python', 'DownloadFile.py', file_id])

if __name__ == "__main__":
    main()
