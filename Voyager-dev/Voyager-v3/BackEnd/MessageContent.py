from openai import OpenAI
import sys

def process_message_content(assistantResponse):
    annotations = assistantResponse.annotations
    citations = []

    # Iterate over the annotations and add footnotes
    for index, annotation in enumerate(annotations):
        # Replace the text with a footnote
        assistantResponse = assistantResponse.replace(annotation.text, f' [{index}]')
        # Gather citations based on annotation attributes
        if (file_citation := getattr(annotation, 'file_citation', None)):
            citations.append(f'[{index}] {file_citation.quote} from {file_citation.filename}')
        elif (file_path := getattr(annotation, 'file_path', None)):
            citations.append(f'[{index}] Click <here> to download {file_path.filename}')
            # Note: File download functionality not implemented above for brevity

    # Add footnotes to the end of the message before displaying to user
    assistantResponse += '\n' + '\n'.join(citations)
    return assistantResponse

def main(assistantResponse):
    api_key = "YOUR_API_KEY"
    try:
        client = OpenAI(api_key=api_key)
        if not client.api_key:
            raise ValueError("API key is missing.")
    except ValueError as e:
        raise ValueError(f"Error Occurred: {e}")

    processed_message_content = process_message_content(assistantResponse)
    print(processed_message_content)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py ASSISTANT_RESPONSE")
        sys.exit(1)

    assistantResponse = sys.argv[1]
    main(assistantResponse)
