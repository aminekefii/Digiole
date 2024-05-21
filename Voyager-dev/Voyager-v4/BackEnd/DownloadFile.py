import sys
from openai import OpenAI
from colorama import Fore

def main(file_ids):
    api_key = ""
    output_path = './downloads/buissnessplan.txt'

    def write_file(file_id, count, output_path=output_path):
        file_data = client.files.content(file_id)
        file_content = file_data.read()
        separator_start = f'\n\n\n\nFILE # {count + 1}\n\n\n\n'
       
        with open(output_path, "ab") as file:
            file.write(separator_start.encode())
            file.write(file_content.rstrip(b'# \n').rstrip(b'#').rstrip(b' \n'))

    try:
        client = OpenAI(api_key=api_key)
    except ValueError as e:
        raise ValueError(f"Error Occurred: {e}")


    for count, file_id in enumerate(file_ids):
        write_file(file_id, count)

    print('Done.')

if __name__ == "__main__":
    file_ids = sys.argv[1:]
    main(file_ids)