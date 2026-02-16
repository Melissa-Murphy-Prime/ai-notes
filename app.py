from flask import Flask, jsonify, request, redirect, url_for, session
from flask_cors import CORS
from gmail_service import GmailService
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import json
import os
import threading

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-in-production'
CORS(app)

# Global to store flow for OAuth
oauth_flows = {}

# Add CSP headers to allow inline scripts and event handlers
@app.after_request
def set_csp(response):
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    return response

# Initialize Gmail service
try:
    gmail = GmailService()
except Exception as e:
    print(f"Failed to initialize Gmail service: {e}")
    gmail = None

@app.route('/api/status', methods=['GET'])
def status():
    """Check if authenticated with Gmail"""
    if gmail:
        return jsonify({'authenticated': True, 'message': 'Connected to Gmail'})
    return jsonify({'authenticated': False, 'message': 'Not connected to Gmail'}), 503

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get inbox statistics"""
    if not gmail:
        return jsonify({'error': 'Gmail service not initialized'}), 503

    stats = gmail.get_inbox_stats()
    return jsonify(stats)

@app.route('/api/preview/old-emails', methods=['GET'])
def preview_old_emails():
    """Preview emails older than 6 months"""
    if not gmail:
        return jsonify({'error': 'Gmail service not initialized'}), 503

    limit = request.args.get('limit', default=20, type=int)
    query = gmail.get_old_emails_query(180)
    emails = gmail.get_emails(query, max_results=limit)

    preview = []
    for email in emails:
        details = gmail.get_email_details(email['id'])
        if details:
            headers = details['payload'].get('headers', [])
            subject = next((h['value'] for h in headers if h['name'] == 'Subject'), 'No Subject')
            from_addr = next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown')
            date = next((h['value'] for h in headers if h['name'] == 'Date'), 'Unknown')

            preview.append({
                'id': email['id'],
                'subject': subject,
                'from': from_addr,
                'date': date
            })

    return jsonify({'emails': preview, 'count': len(preview)})

@app.route('/api/preview/sender-emails', methods=['GET'])
def preview_sender_emails():
    """Preview emails from a specific sender"""
    if not gmail:
        return jsonify({'error': 'Gmail service not initialized'}), 503

    sender = request.args.get('sender')
    if not sender:
        return jsonify({'error': 'Sender parameter required'}), 400

    emails = gmail.get_emails_from_sender(sender)

    preview = []
    for email in emails:
        details = gmail.get_email_details(email['id'])
        if details:
            headers = details['payload'].get('headers', [])
            subject = next((h['value'] for h in headers if h['name'] == 'Subject'), 'No Subject')
            from_addr = next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown')

            preview.append({
                'id': email['id'],
                'subject': subject,
                'from': from_addr
            })

    return jsonify({'emails': preview, 'count': len(preview)})

@app.route('/api/cleanup/delete-old-emails', methods=['POST'])
def delete_old_emails():
    """Delete emails older than 6 months"""
    if not gmail:
        return jsonify({'error': 'Gmail service not initialized'}), 503

    data = request.json
    dry_run = data.get('dry_run', True)

    query = gmail.get_old_emails_query(180)
    emails = gmail.get_emails(query, max_results=1000)

    deleted_count = 0
    if not dry_run:
        for email in emails:
            if gmail.delete_email(email['id']):
                deleted_count += 1

    return jsonify({
        'dry_run': dry_run,
        'emails_to_delete': len(emails),
        'deleted': deleted_count if not dry_run else 0
    })

@app.route('/api/cleanup/archive-old-emails', methods=['POST'])
def archive_old_emails():
    """Archive emails older than 6 months"""
    if not gmail:
        return jsonify({'error': 'Gmail service not initialized'}), 503

    data = request.json
    dry_run = data.get('dry_run', True)

    query = gmail.get_old_emails_query(180)
    emails = gmail.get_emails(query, max_results=1000)

    archived_count = 0
    if not dry_run:
        for email in emails:
            if gmail.archive_email(email['id']):
                archived_count += 1

    return jsonify({
        'dry_run': dry_run,
        'emails_to_archive': len(emails),
        'archived': archived_count if not dry_run else 0
    })

@app.route('/api/cleanup/sender-emails', methods=['POST'])
def cleanup_sender_emails():
    """Delete or archive emails from specific senders"""
    if not gmail:
        return jsonify({'error': 'Gmail service not initialized'}), 503

    data = request.json
    action = data.get('action', 'archive')  # 'delete' or 'archive'
    senders = data.get('senders', [])
    dry_run = data.get('dry_run', True)

    if not senders:
        return jsonify({'error': 'Senders list required'}), 400

    total_processed = 0
    for sender in senders:
        emails = gmail.get_emails_from_sender(sender)

        if not dry_run:
            for email in emails:
                if action == 'delete':
                    gmail.delete_email(email['id'])
                elif action == 'archive':
                    gmail.archive_email(email['id'])
                total_processed += 1
        else:
            total_processed += len(emails)

    return jsonify({
        'action': action,
        'dry_run': dry_run,
        'senders': senders,
        'emails_processed': total_processed
    })

@app.route('/api/cleanup/organize', methods=['POST'])
def organize_emails():
    """Organize emails with labels"""
    if not gmail:
        return jsonify({'error': 'Gmail service not initialized'}), 503

    data = request.json
    sender = data.get('sender')
    label = data.get('label')
    dry_run = data.get('dry_run', True)

    if not sender or not label:
        return jsonify({'error': 'Sender and label parameters required'}), 400

    emails = gmail.get_emails_from_sender(sender)

    labeled_count = 0
    if not dry_run:
        for email in emails:
            if gmail.add_label(email['id'], label):
                labeled_count += 1

    return jsonify({
        'dry_run': dry_run,
        'sender': sender,
        'label': label,
        'emails_labeled': labeled_count if not dry_run else len(emails)
    })

@app.route('/authenticate')
def authenticate():
    """Generate OAuth authorization URL"""
    SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

    try:
        flow = InstalledAppFlow.from_client_secrets_file(
            'credentials.json', SCOPES)

        # Generate authorization URL
        auth_url, state = flow.authorization_url(prompt='consent')

        # Store flow for later use in callback
        oauth_flows[state] = flow

        return jsonify({
            'auth_url': auth_url,
            'message': 'Open the URL in your browser to authorize'
        })
    except Exception as e:
        return jsonify({'error': f'Authentication setup failed: {str(e)}'}), 500

@app.route('/oauth-callback')
def oauth_callback():
    """Handle OAuth callback"""
    try:
        code = request.args.get('code')
        state = request.args.get('state')

        if not code or state not in oauth_flows:
            return jsonify({'error': 'Invalid callback'}), 400

        flow = oauth_flows[state]
        creds = flow.fetch_token(code=code)

        # Save credentials
        with open('token.json', 'w') as token:
            token.write(creds.to_json()) if hasattr(creds, 'to_json') else token.write(json.dumps(creds))

        # Clean up
        del oauth_flows[state]

        return redirect(url_for('index'))
    except Exception as e:
        return jsonify({'error': f'OAuth callback failed: {str(e)}'}), 500

@app.route('/')
def index():
    """Serve the web interface"""
    from flask import send_from_directory
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
