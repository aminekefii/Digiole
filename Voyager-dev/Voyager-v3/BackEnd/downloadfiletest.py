import sys
from openai import OpenAI
from colorama import Fore

def main(file_id):
    api_key = ""
    output_path = './uploads/buissnessplan.txt'

    def write_file(file_id, output_path=output_path):
    file_data = client.files.content(file_id)
    file_content = file_data.read().decode('utf-8')

    # Find the index of the delimiter line
    delimiter_index = file_content.find('#' * 100)

    if delimiter_index != -1:
        # Write only the content before the delimiter to the file
        file_content_to_write = file_content[:delimiter_index]
    else:
        file_content_to_write = file_content

    with open(output_path, "ab") as file:
        file.write(file_content_to_write.encode())

    try:
        client = OpenAI(api_key=api_key)
    except ValueError as e:
        raise ValueError(f"Error Occurred: {e}")

    print(Fore.GREEN + f'API KEY: {api_key}')

    print('\nFILE ID: ', file_id)
    print('\nWriting file...\n')
    write_file(file_id, 0)
    print(Fore.GREEN + 'File written.\n')

    print('Done.')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <file_id>")
        sys.exit(1)
    file_id = sys.argv[1]
    main(file_id)
