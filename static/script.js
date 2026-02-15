const API_BASE = '/api';

// Load stats on page load
document.addEventListener('DOMContentLoaded', loadStats);

async function loadStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        const data = await response.json();

        document.getElementById('total-emails').textContent = data.total?.toLocaleString() || '-';
        document.getElementById('old-emails').textContent = data.old_emails?.toLocaleString() || '-';
        document.getElementById('percent-old').textContent = data.percentage_old || '-';
    } catch (error) {
        console.error('Error loading stats:', error);
        showError('Failed to load inbox statistics');
    }
}

async function previewOldEmails() {
    const previewArea = document.getElementById('delete-preview');
    previewArea.classList.add('active');
    previewArea.innerHTML = '<p>Loading preview...</p>';

    try {
        const response = await fetch(`${API_BASE}/preview/old-emails?limit=20`);
        const data = await response.json();

        let html = `<div class="preview-summary"><p>Found ${data.count} emails older than 6 months (showing first 20)</p></div>`;
        data.emails.forEach(email => {
            html += `
                <div class="email-item">
                    <div class="subject">${escapeHtml(email.subject)}</div>
                    <div class="from">From: ${escapeHtml(email.from)}</div>
                    <div class="date">${email.date}</div>
                </div>
            `;
        });

        previewArea.innerHTML = html;
    } catch (error) {
        console.error('Error loading preview:', error);
        previewArea.innerHTML = '<p class="error">Failed to load preview</p>';
    }
}

async function deleteOldEmails() {
    if (!confirm('This will PERMANENTLY DELETE emails older than 6 months. Are you sure?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/cleanup/delete-old-emails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dry_run: false })
        });
        const data = await response.json();
        showSuccess(`Deleted ${data.deleted} emails`);
        loadStats();
    } catch (error) {
        console.error('Error deleting emails:', error);
        showError('Failed to delete emails');
    }
}

async function archiveOldEmails() {
    if (!confirm('This will archive all emails older than 6 months. Continue?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/cleanup/archive-old-emails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dry_run: false })
        });
        const data = await response.json();
        showSuccess(`Archived ${data.archived} emails`);
        loadStats();
    } catch (error) {
        console.error('Error archiving emails:', error);
        showError('Failed to archive emails');
    }
}

async function previewSenderEmails() {
    const sender = document.getElementById('sender-input').value.trim();
    if (!sender) {
        showError('Please enter a sender email or domain');
        return;
    }

    const previewArea = document.getElementById('sender-preview');
    previewArea.classList.add('active');
    previewArea.innerHTML = '<p>Loading preview...</p>';

    try {
        const response = await fetch(`${API_BASE}/preview/sender-emails?sender=${encodeURIComponent(sender)}`);
        const data = await response.json();

        let html = `<div class="preview-summary"><p>Found ${data.count} emails from/to ${escapeHtml(sender)}</p></div>`;
        data.emails.forEach(email => {
            html += `
                <div class="email-item">
                    <div class="subject">${escapeHtml(email.subject)}</div>
                    <div class="from">From: ${escapeHtml(email.from)}</div>
                </div>
            `;
        });

        previewArea.innerHTML = html;
    } catch (error) {
        console.error('Error loading preview:', error);
        previewArea.innerHTML = '<p class="error">Failed to load preview</p>';
    }
}

async function deleteSenderEmails() {
    const sender = document.getElementById('sender-input').value.trim();
    if (!sender) {
        showError('Please enter a sender email or domain');
        return;
    }

    if (!confirm(`This will PERMANENTLY DELETE all emails from ${sender}. Are you sure?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/cleanup/sender-emails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete', senders: [sender], dry_run: false })
        });
        const data = await response.json();
        showSuccess(`Deleted ${data.emails_processed} emails from ${sender}`);
        loadStats();
    } catch (error) {
        console.error('Error deleting emails:', error);
        showError('Failed to delete emails');
    }
}

async function archiveSenderEmails() {
    const sender = document.getElementById('sender-input').value.trim();
    if (!sender) {
        showError('Please enter a sender email or domain');
        return;
    }

    if (!confirm(`This will archive all emails from ${sender}. Continue?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/cleanup/sender-emails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'archive', senders: [sender], dry_run: false })
        });
        const data = await response.json();
        showSuccess(`Archived ${data.emails_processed} emails from ${sender}`);
        loadStats();
    } catch (error) {
        console.error('Error archiving emails:', error);
        showError('Failed to archive emails');
    }
}

async function previewOrganize() {
    const sender = document.getElementById('organize-sender').value.trim();
    const label = document.getElementById('organize-label').value.trim();

    if (!sender || !label) {
        showError('Please enter both sender and label');
        return;
    }

    const previewArea = document.getElementById('organize-preview');
    previewArea.classList.add('active');
    previewArea.innerHTML = '<p>Loading preview...</p>';

    try {
        const response = await fetch(`${API_BASE}/preview/sender-emails?sender=${encodeURIComponent(sender)}`);
        const data = await response.json();

        let html = `<div class="preview-summary"><p>Will label ${data.count} emails from ${escapeHtml(sender)} with "${escapeHtml(label)}"</p></div>`;
        data.emails.slice(0, 10).forEach(email => {
            html += `
                <div class="email-item">
                    <div class="subject">${escapeHtml(email.subject)}</div>
                    <div class="from">From: ${escapeHtml(email.from)}</div>
                </div>
            `;
        });

        previewArea.innerHTML = html;
    } catch (error) {
        console.error('Error loading preview:', error);
        previewArea.innerHTML = '<p class="error">Failed to load preview</p>';
    }
}

async function organizeEmails() {
    const sender = document.getElementById('organize-sender').value.trim();
    const label = document.getElementById('organize-label').value.trim();

    if (!sender || !label) {
        showError('Please enter both sender and label');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/cleanup/organize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender, label, dry_run: false })
        });
        const data = await response.json();
        showSuccess(`Labeled ${data.emails_labeled} emails with "${label}"`);
        loadStats();
    } catch (error) {
        console.error('Error organizing emails:', error);
        showError('Failed to label emails');
    }
}

function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'error';
    notification.textContent = message;
    document.body.insertBefore(notification, document.body.firstChild);
    setTimeout(() => notification.remove(), 5000);
}

function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'success';
    notification.textContent = message;
    document.body.insertBefore(notification, document.body.firstChild);
    setTimeout(() => notification.remove(), 5000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
