import re
import sys
import json
import subprocess

def process_message_content(assistant_response, annotations):
    file_id = None
    file_txt = None
    
    # Collect the first file ID and file text from annotations if available
    if annotations:
        file_id = annotations[0]['file_path']['file_id']
        file_txt = annotations[0]['text']
    
    # Check if file text exists in assistant_response and replace it with file ID
    if file_id and file_txt and file_txt in assistant_response:
        assistant_response = assistant_response.replace(file_txt, "done!")

    # Use regex to identify and remove any line containing a pattern similar to the specific line
    pattern = r"You can download it (from|using) the link below:"
    # Replace any line matching the pattern with an empty string
    assistant_response = re.sub(pattern, '', assistant_response, flags=re.IGNORECASE)

    # Optionally, remove any excess blank lines that might remain
    assistant_response = '\n'.join([line for line in assistant_response.split('\n') if line.strip()])

    return assistant_response

def main():
    # Assuming the JSON string is passed as the first command-line argument
    args_json = sys.argv[1]
    args = json.loads(args_json)
    
    assistant_response = args['assistantResponse']
    annotations = args['annotations']

    # Process the message content
    processed_message_content = process_message_content(assistant_response, annotations)
    print(processed_message_content)

    # Call the second script to download the file if file ID is available
    if annotations and 'file_path' in annotations[0]:
        file_id = annotations[0]['file_path']['file_id']
        subprocess.run(['python', 'DownloadFile.py', file_id])

if __name__ == "__main__":
    main()
