import json
with open('issues.json', encoding='utf-16') as f:
    data = json.load(f)
for i in data:
    print(f"#{i['number']}: {i['title']} - {i['body'][:100]}")
