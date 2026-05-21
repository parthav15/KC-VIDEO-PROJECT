#!/bin/bash
set -euo pipefail

if [ -z "${OPENAI_API_KEY:-}" ]; then
  echo "OPENAI_API_KEY is not set" >&2
  exit 1
fi

VOICE="${1:-ash}"
SPEED="${2:-1.18}"
INPUT_FILE="scripts/voice.txt"
OUTPUT_FILE="public/audio/voiceover.mp3"

INPUT_TEXT=$(cat "$INPUT_FILE")

INSTRUCTIONS="Speak with HIGH ENERGY, excitement, and warmth — like an enthusiastic Indian college admissions ad on TV or YouTube. Bright, upbeat, motivating tone. Confident pace, slightly fast but crisp. Punch the key words: 'OPEN', '100 percent', 'ACHIEVE', 'call now', 'Apply today'. Sound genuinely excited about students' futures. When listing courses, keep momentum — don't slow down, just rhythmically tick through them. When reading phone digits, group them clearly but with energy. End each line with uplift, not a flat drop. Avoid sounding monotone, sleepy, or somber."

PAYLOAD=$(jq -n \
  --arg model "gpt-4o-mini-tts" \
  --arg voice "$VOICE" \
  --arg input "$INPUT_TEXT" \
  --arg instructions "$INSTRUCTIONS" \
  --argjson speed "$SPEED" \
  '{model: $model, voice: $voice, input: $input, instructions: $instructions, response_format: "mp3", speed: $speed}')

curl -sS -X POST https://api.openai.com/v1/audio/speech \
  -H "Authorization: Bearer ${OPENAI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  --output "$OUTPUT_FILE"

ls -la "$OUTPUT_FILE"
ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$OUTPUT_FILE"
