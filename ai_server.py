#!/usr/bin/env python3
"""
Simple Flask server to proxy Claude API and ElevenLabs requests
This avoids CORS issues when calling from the browser
"""

from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import requests
import os
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Claude API configuration
# Set ANTHROPIC_API_KEY environment variable or replace with your key
CLAUDE_API_KEY = os.environ.get('ANTHROPIC_API_KEY', 'your-anthropic-api-key-here')
CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'
CLAUDE_MODEL = 'claude-3-5-haiku-20241022'  # Cheaper model

# ElevenLabs API configuration
# Set ELEVENLABS_API_KEY environment variable or replace with your key
ELEVENLABS_API_KEY = os.environ.get('ELEVENLABS_API_KEY', 'your-elevenlabs-api-key-here')
ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1'
ELEVENLABS_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'  # Default voice (Rachel - friendly female)

@app.route('/api/chat', methods=['POST'])
def chat():
    """Proxy chat requests to Claude API"""
    try:
        data = request.json
        messages = data.get('messages', [])
        
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400
        
        # Prepare request to Claude API
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
        }
        
        payload = {
            'model': CLAUDE_MODEL,
            'max_tokens': 1024,
            'messages': messages
        }
        
        # Make request to Claude API
        response = requests.post(CLAUDE_API_URL, json=payload, headers=headers, timeout=30)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            error_data = response.json() if response.text else {}
            return jsonify({
                'error': error_data.get('error', {}).get('message', 'Failed to get response from AI')
            }), response.status_code
            
    except requests.exceptions.Timeout:
        return jsonify({'error': 'Request timeout. Please try again.'}), 504
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Network error: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    """Convert text to speech using ElevenLabs"""
    try:
        data = request.json
        text = data.get('text', '')
        voice_id = data.get('voice_id', ELEVENLABS_VOICE_ID)
        model_id = data.get('model_id', 'eleven_monolingual_v1')  # Default model
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Prepare request to ElevenLabs API
        url = f'{ELEVENLABS_API_URL}/text-to-speech/{voice_id}'
        headers = {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': ELEVENLABS_API_KEY.strip()
        }
        
        # Get voice settings from request or use defaults
        voice_settings = data.get('settings', {})
        if not voice_settings:
            voice_settings = {
                'stability': 0.5,
                'similarity_boost': 0.75,
                'style': 0.0,
                'use_speaker_boost': True
            }
        
        payload = {
            'text': text,
            'model_id': model_id,
            'voice_settings': voice_settings
        }
        
        # Make request to ElevenLabs API
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        if response.status_code == 200:
            # Return audio as stream
            return Response(
                response.content,
                mimetype='audio/mpeg',
                headers={
                    'Content-Disposition': 'inline; filename=speech.mp3',
                    'Cache-Control': 'no-cache'
                }
            )
        else:
            # Log error for debugging
            print(f"ElevenLabs TTS Error: Status {response.status_code}")
            print(f"Response: {response.text[:500]}")
            error_data = response.json() if response.text else {}
            error_msg = error_data.get('detail', {}).get('message', '') if isinstance(error_data.get('detail'), dict) else str(error_data.get('detail', 'Failed to generate speech'))
            if not error_msg:
                error_msg = f'HTTP {response.status_code}: Failed to generate speech'
            return jsonify({
                'error': error_msg
            }), response.status_code
            
    except requests.exceptions.Timeout:
        return jsonify({'error': 'Request timeout. Please try again.'}), 504
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Network error: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/voices', methods=['GET'])
def get_voices():
    """Get available voices from ElevenLabs"""
    try:
        url = f'{ELEVENLABS_API_URL}/voices'
        headers = {
            'xi-api-key': ELEVENLABS_API_KEY.strip()
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            # Log error for debugging
            print(f"ElevenLabs Voices Error: Status {response.status_code}")
            print(f"Response: {response.text[:500]}")
            error_data = response.json() if response.text else {}
            error_msg = error_data.get('detail', {}).get('message', '') if isinstance(error_data.get('detail'), dict) else str(error_data.get('detail', 'Failed to fetch voices'))
            if not error_msg:
                error_msg = f'HTTP {response.status_code}: Failed to fetch voices'
            return jsonify({'error': error_msg}), response.status_code
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/verify-key', methods=['GET'])
def verify_api_key():
    """Verify ElevenLabs API key"""
    try:
        url = f'{ELEVENLABS_API_URL}/user'
        headers = {
            'xi-api-key': ELEVENLABS_API_KEY.strip()
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            user_data = response.json()
            return jsonify({
                'valid': True,
                'subscription': user_data.get('subscription', {}),
                'character_count': user_data.get('character_count', 0),
                'character_limit': user_data.get('character_limit', 0)
            })
        else:
            return jsonify({
                'valid': False,
                'error': f'HTTP {response.status_code}',
                'message': response.text[:200] if response.text else 'Invalid API key'
            }), response.status_code
            
    except Exception as e:
        return jsonify({'valid': False, 'error': str(e)}), 500

@app.route('/api/voice-clone', methods=['POST'])
def voice_clone():
    """Clone a voice from audio sample"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        file = request.files['file']
        name = request.form.get('name', 'Cloned Voice')
        description = request.form.get('description', '')
        
        url = f'{ELEVENLABS_API_URL}/voices/add'
        headers = {
            'xi-api-key': ELEVENLABS_API_KEY.strip()
        }
        
        # ElevenLabs expects files as a list
        files = [
            ('files', (file.filename, file.stream, file.content_type))
        ]
        data = {
            'name': name,
            'description': description
        }
        
        response = requests.post(url, headers=headers, files=files, data=data, timeout=60)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            error_data = response.json() if response.text else {}
            return jsonify({
                'error': error_data.get('detail', {}).get('message', 'Failed to clone voice')
            }), response.status_code
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/voice-convert', methods=['POST'])
def voice_convert():
    """Convert voice in audio using a voice ID"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        file = request.files['file']
        voice_id = request.form.get('voice_id', ELEVENLABS_VOICE_ID)
        
        url = f'{ELEVENLABS_API_URL}/voice-conversion'
        headers = {
            'xi-api-key': ELEVENLABS_API_KEY.strip()
        }
        
        files = {
            'audio': (file.filename, file.stream, file.content_type)
        }
        data = {
            'voice_id': voice_id
        }
        
        response = requests.post(url, headers=headers, files=files, data=data, timeout=60)
        
        if response.status_code == 200:
            return Response(
                response.content,
                mimetype='audio/mpeg',
                headers={
                    'Content-Disposition': 'inline; filename=converted.mp3',
                    'Cache-Control': 'no-cache'
                }
            )
        else:
            error_data = response.json() if response.text else {}
            return jsonify({
                'error': error_data.get('detail', {}).get('message', 'Failed to convert voice')
            }), response.status_code
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/voice-settings', methods=['POST'])
def update_voice_settings():
    """Update voice settings"""
    try:
        data = request.json
        voice_id = data.get('voice_id', ELEVENLABS_VOICE_ID)
        settings = data.get('settings', {})
        
        url = f'{ELEVENLABS_API_URL}/voices/{voice_id}/settings'
        headers = {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVENLABS_API_KEY
        }
        
        response = requests.post(url, json=settings, headers=headers, timeout=10)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            error_data = response.json() if response.text else {}
            return jsonify({
                'error': error_data.get('detail', {}).get('message', 'Failed to update settings')
            }), response.status_code
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/delete-voice', methods=['DELETE'])
def delete_voice():
    """Delete a cloned voice"""
    try:
        data = request.json
        voice_id = data.get('voice_id')
        
        if not voice_id:
            return jsonify({'error': 'No voice_id provided'}), 400
        
        url = f'{ELEVENLABS_API_URL}/voices/{voice_id}'
        headers = {
            'xi-api-key': ELEVENLABS_API_KEY.strip()
        }
        
        response = requests.delete(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            return jsonify({'success': True})
        else:
            error_data = response.json() if response.text else {}
            return jsonify({
                'error': error_data.get('detail', {}).get('message', 'Failed to delete voice')
            }), response.status_code
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/music-generate', methods=['POST'])
def generate_music():
    """Generate music using text description (placeholder for future integration)"""
    try:
        data = request.json
        prompt = data.get('prompt', '')
        duration = data.get('duration', 30)  # seconds
        style = data.get('style', 'ambient')
        
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400
        
        # Note: ElevenLabs doesn't have direct music generation
        # This is a placeholder that could integrate with other services
        # For now, we'll return an error suggesting alternative services
        return jsonify({
            'error': 'Music generation is not directly available through ElevenLabs API. Consider using text-to-speech with musical descriptions or integrate with other music generation APIs like Suno, Udio, or MusicLM.',
            'suggestion': 'You can use TTS to create voice-based music descriptions or integrate with dedicated music generation services.'
        }), 501
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    print("Starting AI Chatbot Server on http://localhost:5001")
    print("Make sure to install dependencies: pip install flask flask-cors requests")
    app.run(host='0.0.0.0', port=5001, debug=True)

