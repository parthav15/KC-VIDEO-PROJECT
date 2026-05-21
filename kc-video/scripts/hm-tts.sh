#!/bin/bash
set -euo pipefail

if [ -z "${OPENAI_API_KEY:-}" ]; then
  echo "OPENAI_API_KEY is not set" >&2
  exit 1
fi

VOICE="${1:-ash}"
SPEED="${2:-1.13}"
INPUT_FILE="scripts/hm-voice.txt"
OUTPUT_FILE="${3:-public/audio/hm-voiceover.mp3}"

INPUT_TEXT=$(cat "$INPUT_FILE")

INSTRUCTIONS="Deliver this like a HIGH-ENERGY, premium social media ad voiceover — confident, intriguing, and aspirational. Open with a DRAMATIC pause-then-punch on the hook: 'From a classroom in Punjab…' (mysterious build) '…to The Macallan.' (big reveal). Strong, polished, slightly raspy texture, like a luxury commercial narrator. Pick up pace through the middle. Punch the words: OPEN, GLOBAL ICONS, Brand Ambassador, The Macallan, Apply today. Sound EXCITED about Vinay's story — like you're sharing something remarkable. End with confident CTA energy. Neutral global English accent. NEVER sound robotic, sleepy, or monotone."

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
