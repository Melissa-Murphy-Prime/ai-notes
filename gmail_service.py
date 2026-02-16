import os
import pickle
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient import discovery
from datetime import datetime, timedelta
import base64

SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

class GmailService:
    def __init__(self):
        self.service = None
        self.authenticate()

    def authenticate(self):
        """Authenticate with Gmail API using OAuth 2.0"""
        creds = None

        # Check for existing token
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SCOPES)

        # If no valid credentials, do OAuth flow
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)

            # Save credentials for next run
            with open('token.json', 'w') as token:
                token.write(creds.to_json())

        self.service = discovery.build('gmail', 'v1', credentials=creds)

    def get_emails(self, query, max_results=10):
        """Get emails matching a query"""
        try:
            results = self.service.users().messages().list(
                userId='me',
                q=query,
                maxResults=max_results
            ).execute()
            return results.get('messages', [])
        except Exception as e:
            print(f"Error fetching emails: {e}")
            return []

    def get_email_details(self, message_id):
        """Get full details of an email"""
        try:
            message = self.service.users().messages().get(
                userId='me',
                id=message_id,
                format='full'
            ).execute()
            return message
        except Exception as e:
            print(f"Error getting email details: {e}")
            return None

    def get_old_emails_query(self, days=180):
        """Generate query for emails older than specified days"""
        cutoff_date = (datetime.now() - timedelta(days=days)).strftime('%Y/%m/%d')
        return f"before:{cutoff_date}"

    def get_emails_from_sender(self, sender):
        """Get emails from a specific sender"""
        query = f"from:{sender}"
        return self.get_emails(query, max_results=50)

    def delete_email(self, message_id):
        """Delete an email permanently"""
        try:
            self.service.users().messages().delete(
                userId='me',
                id=message_id
            ).execute()
            return True
        except Exception as e:
            print(f"Error deleting email: {e}")
            return False

    def archive_email(self, message_id):
        """Archive an email (remove from inbox)"""
        try:
            self.service.users().messages().modify(
                userId='me',
                id=message_id,
                body={'removeLabelIds': ['INBOX']}
            ).execute()
            return True
        except Exception as e:
            print(f"Error archiving email: {e}")
            return False

    def add_label(self, message_id, label_name):
        """Add a label to an email"""
        try:
            # Get or create label
            labels_result = self.service.users().labels().list(userId='me').execute()
            labels = labels_result.get('labels', [])

            label_id = None
            for label in labels:
                if label['name'] == label_name:
                    label_id = label['id']
                    break

            if not label_id:
                label_body = {
                    'name': label_name,
                    'labelListVisibility': 'labelShow',
                    'messageListVisibility': 'show'
                }
                created_label = self.service.users().labels().create(
                    userId='me',
                    body=label_body
                ).execute()
                label_id = created_label['id']

            self.service.users().messages().modify(
                userId='me',
                id=message_id,
                body={'addLabelIds': [label_id]}
            ).execute()
            return True
        except Exception as e:
            print(f"Error adding label: {e}")
            return False

    def get_inbox_stats(self):
        """Get statistics about the inbox"""
        try:
            all_emails = self.service.users().messages().list(
                userId='me',
                q="",
                maxResults=1
            ).execute()
            total_count = all_emails.get('resultSizeEstimate', 0)

            old_emails = self.service.users().messages().list(
                userId='me',
                q=self.get_old_emails_query(180),
                maxResults=1
            ).execute()
            old_count = old_emails.get('resultSizeEstimate', 0)

            return {
                'total': total_count,
                'old_emails': old_count,
                'percentage_old': round((old_count / total_count * 100) if total_count > 0 else 0, 2)
            }
        except Exception as e:
            print(f"Error getting stats: {e}")
            return {}
