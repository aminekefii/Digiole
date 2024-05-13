import sys
import json

def process_message_content(assistant_response, annotations):
    # Initialize a list to store file IDs
    file_ids = []
    
    # Collect file IDs from annotations
    for annotation in annotations:
        file_id = annotation['file_path']['file_id']
        file_ids.append(f"File ID: {file_id}")
    
    # Append file IDs to the response if there are any
    if file_ids:
        assistant_response += '\n' + '\n'.join(file_ids)
    
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

if __name__ == "__main__":
    main()
