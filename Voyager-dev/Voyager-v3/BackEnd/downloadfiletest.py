import sys
from openai import OpenAI
from colorama import Fore

def main(file_ids):
    output_path = './uploads/buissnessplan.txt'

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

    print(Fore.GREEN + f'API KEY: {api_key}')

    print('\nFILE IDS: ', file_ids)
    print('\nNUMBER OF FILE IDS: ', len(file_ids))
    for count, file_id in enumerate(file_ids):
        print(Fore.GREEN + f'\nWriting file #{count + 1}...\n')
        write_file(file_id, count)
        print(Fore.GREEN + f'File {count + 1} written.\n')

    print('Done.')

if __name__ == "__main__":
    file_ids = sys.argv[1:]
    main(file_ids)
