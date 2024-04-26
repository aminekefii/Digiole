from openai import OpenAI
from colorama import Fore


api_key = ""

try:
    client = OpenAI(api_key=api_key)
    if not client.api_key:
        raise ValueError("API key is missing.")
except ValueError as e:
    raise ValueError(f"Error Occurred: {e}")

print(Fore.GREEN + f'API KEY: {client.api_key}')

thread_id = 'thread_0t2oYSIaPVV78hXdjDpQFR5e'
output_path = '/uploads'

def get_response(thread_id):
    return client.beta.threads.messages.list(thread_id=thread_id)

def get_file_ids_from_thread(thread):
    file_ids = [
        file_id
        for m in get_response(thread)
        for file_id in m.file_ids
    ]
    return file_ids

def write_file(file_id, count, output_path=output_path):
    file_data = client.files.content(file_id)
    file_content = file_data.read()
    separator_start = f'\n\n\n\nFILE # {count + 1}\n\n\n\n'
    separator_end = '\n\n\n\n' + '#' * 100 + '\n\n\n\n'

    with open(output_path, "ab") as file:
        file.write(separator_start.encode())
        file.write(file_content)
        file.write(separator_end.encode())

file_ids = get_file_ids_from_thread(thread_id)
print('\nFILE IDS: ', file_ids)
print('\nNUMBER OF FILE IDS: ', len(file_ids))
for count, file_id in enumerate(file_ids):
    print(Fore.GREEN + f'\nWriting file #{count + 1}...\n')
    write_file(file_id, count)
    print(Fore.GREEN + f'File {count + 1} written.\n')

print('Done.')
