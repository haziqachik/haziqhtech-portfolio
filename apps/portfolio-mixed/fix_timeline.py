import json

with open('content/timeline.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if isinstance(data, dict) and 'value' in data:
    timeline_array = data['value']
else:
    timeline_array = data

timeline_array[1]['date'] = 'Nov 2024 - Nov 2025'

with open('content/timeline.json', 'w', encoding='utf-8') as f:
    json.dump(timeline_array, f, indent=2, ensure_ascii=False)

print("? Fixed timeline.json:")
print(f"  - Removed value wrapper")
print(f"  - Updated BCA: Nov 2024 - Nov 2025")
print(f"  - Total entries: {len(timeline_array)}")
