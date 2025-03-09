import os
import requests
import json
import subprocess

fastqc_path = r"C:\Users\theno\Desktop\NOToRI0US\fastqc\FastQC\run_fastqc.bat"
fastqc_dir = r"C:\Users\theno\Desktop\NOToRI0US\fastqc\FastQC"
ollama_url = "http://localhost:11434/api/generate"

def ask_ollama(command):
    payload = {
        "model": "llama3.2",
        "prompt": (
            "You’re a bioinformatics assistant. Command: '{command}'. "
            "Respond ONLY with 'run_fastqc' if it’s about DNA quality (e.g., 'check quality', 'analyze data'). "
            "Respond ONLY with 'unknown' if not. No extra text."
        ).format(command=command),
        "stream": False
    }
    try:
        response = requests.post(ollama_url, json=payload)
        response.raise_for_status()
        data = json.loads(response.text)
        return data.get("response", "unknown")
    except requests.RequestException as e:
        print(f"Ollama fucked up: {e}")
        return "unknown"

print("Bio Assistant Online")
command = input("What’s the job? (e.g., 'check data quality'): ")
data_file = input("File path? (e.g., C:\\Users\\theno\\Desktop\\sample.fastq): ")

action = ask_ollama(command)
print(f"Ollama’s call: {action}")

if action == "run_fastqc":
    if os.path.exists(data_file):
        try:
            proc = subprocess.run([fastqc_path, data_file], check=True, shell=True, cwd=fastqc_dir, capture_output=True, text=True)
            print("FastQC’s shredding—check Desktop.")
            print(f"Output: {proc.stdout}")
        except subprocess.CalledProcessError as e:
            print(f"FastQC crapped out: {e}\nError: {e.stderr}")
    else:
        print("File’s AWOL—fix it.")
else:
    print("Lost me—say 'check data quality' or some shit.")