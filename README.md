# Gmail Inbox Cleanup Tool

A web-based tool to automate Gmail inbox cleanup with features for archiving, deleting, and organizing emails.

## Features

- Delete emails older than 6 months
- Archive emails to keep them organized
- Delete emails from specific senders/domains
- Organize emails with labels
- Web interface for easy management
- REST API for programmatic access

## Setup

### 1. Gmail API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Gmail API
4. Create OAuth 2.0 Desktop credentials
5. Download the JSON file as `credentials.json`
6. Place it in the project root

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Application

```bash
python app.py
```

Visit http://localhost:5000 in your browser.

## Usage

- First run will prompt you to authenticate with Gmail
- Use the web interface to:
  - Set cleanup criteria (age, sender, domain)
  - Preview emails to be cleaned
  - Execute cleanup operations
