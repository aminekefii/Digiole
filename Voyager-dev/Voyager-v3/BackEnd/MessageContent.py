import re
import sys
import json
import subprocess

def process_message_content(assistant_response, annotations):
    file_id = None
    file_txt = None
    
    if annotations:
        file_id = annotations[0]['file_path']['file_id']
        file_txt = annotations[0]['text']
    
    if file_id and file_txt and file_txt in assistant_response:
        assistant_response = assistant_response.replace(file_txt, "done!")

    pattern = r"You can download it (from|using) the link below:"
    assistant_response = re.sub(pattern, '', assistant_response, flags=re.IGNORECASE)

    assistant_response = '\n'.join([line for line in assistant_response.split('\n') if line.strip()])

    return assistant_response

def main():
    args_json = sys.argv[1]
    args = json.loads(args_json)
    
    assistant_response = args['assistantResponse']
    annotations = args['annotations']

    processed_message_content = process_message_content(assistant_response, annotations)
    print(processed_message_content)

    if annotations and 'file_path' in annotations[0]:
        file_id = annotations[0]['file_path']['file_id']
        subprocess.run(['python', 'DownloadFile.py', file_id])

if __name__ == "__main__":
    main()
