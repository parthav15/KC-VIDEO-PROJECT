#!/bin/bash
set -euo pipefail

if [ -z "${ELEVENLABS_API_KEY:-}" ]; then
  echo "ELEVENLABS_API_KEY not set" >&2
  exit 1
fi

VOICE_ID="${1:-JBFqnCBsd6RMkjVDRZzb}"  # George
INPUT_FILE="${2:-scripts/hm-voice.txt}"
OUTPUT_MP3="${3:-public/audio/hm-voiceover.mp3}"
OUTPUT_ALIGN="${4:-scripts/hm-alignment.json}"

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

RESP=$(curl -sS -X POST "https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_128" \
  -H "xi-api-key: ${ELEVENLABS_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

# Response is JSON: { audio_base64, alignment: {characters, character_start_times_seconds, character_end_times_seconds}, normalized_alignment: {...} }
echo "$RESP" | jq -r '.audio_base64' | base64 -d > "$OUTPUT_MP3"
echo "$RESP" | jq '{alignment, normalized_alignment}' > "$OUTPUT_ALIGN"

ls -la "$OUTPUT_MP3" "$OUTPUT_ALIGN"
file "$OUTPUT_MP3" | head -1
ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$OUTPUT_MP3"
