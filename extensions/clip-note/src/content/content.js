(function() {
  if (document.getElementById('clipnote-sidebar')) return;

  function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'clipnote-sidebar';
    
    sidebar.innerHTML = `
      <div id="clipnote-header">
        <h2>ClipNote</h2>
        <button id="clipnote-close">X</button>
      </div>
      <div id="clipnote-content">
        <!-- Notes will appear here -->
      </div>
      <div id="clipnote-controls">
        <textarea id="clipnote-input" placeholder="Take a note at current time..." rows="3"></textarea>
        <button id="clipnote-add" class="clipnote-btn btn-primary">Add Note @ Timestamp</button>
        <button id="clipnote-sync" class="clipnote-btn btn-premium">👑 Sync to Notion (Premium)</button>
      </div>
    `;

    document.body.appendChild(sidebar);

    document.getElementById('clipnote-close').addEventListener('click', () => {
      sidebar.style.display = 'none';
    });

    document.getElementById('clipnote-add').addEventListener('click', () => {
      const video = document.querySelector('video');
      const time = video ? Math.floor(video.currentTime) : 0;
      const text = document.getElementById('clipnote-input').value;
      if (!text) return;
      
      const content = document.getElementById('clipnote-content');
      const note = document.createElement('div');
      note.className = 'note-item';
      
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      note.innerHTML = `<span class="note-time">[${timeStr}]</span> ${text}`;
      content.appendChild(note);
      document.getElementById('clipnote-input').value = '';
    });

    document.getElementById('clipnote-sync').addEventListener('click', async () => {
      const isPremium = await ClipNoteLicense.checkPremiumStatus();
      if (!isPremium) {
        alert('Notion Sync requires Premium ($1.99/mo). Upgrade today!');
      } else {
        alert('Syncing to Notion...');
      }
    });
  }

  // Attempt to inject when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSidebar);
  } else {
    createSidebar();
  }
})();
