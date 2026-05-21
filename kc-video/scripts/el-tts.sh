#!/bin/bash
set -euo pipefail

if [ -z "${ELEVENLABS_API_KEY:-}" ]; then
  echo "ELEVENLABS_API_KEY not set" >&2
  exit 1
fi

VOICE_ID="${1:-nPczCjzI2devNBz1zQrb}"  # Brian
INPUT_FILE="${2:-scripts/hm-voice.txt}"
OUTPUT_FILE="${3:-public/audio/hm-voiceover.mp3}"

INPUT_TEXT=$(cat "$INPUT_FILE")

PAYLOAD=$(jq -n \
  --arg text "$INPUT_TEXT" \
  --arg model_id "eleven_multilingual_v2" \
  '{
    text: $text,
    model_id: $model_id,
    voice_settings: {
      stability: 0.42,
      similarity_boost: 0.78,
      style: 0.55,
      use_speaker_boost: true,
      speed: 1.10
    }
  }')

curl -sS -X POST "https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128" \
  -H "xi-api-key: ${ELEVENLABS_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  --output "$OUTPUT_FILE"

ls -la "$OUTPUT_FILE"
file "$OUTPUT_FILE" | head -1
ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$OUTPUT_FILE"
