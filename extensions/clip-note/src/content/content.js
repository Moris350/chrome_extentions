(function() {
  if (document.getElementById('clipnote-sidebar')) return;

  function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'clipnote-sidebar';
    
    const header = document.createElement('div');
    header.id = 'clipnote-header';
    const h2 = document.createElement('h2');
    h2.textContent = 'ClipNote';
    const closeBtn = document.createElement('button');
    closeBtn.id = 'clipnote-close';
    closeBtn.textContent = 'X';
    header.appendChild(h2);
    header.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = 'clipnote-content';

    const controls = document.createElement('div');
    controls.id = 'clipnote-controls';
    const input = document.createElement('textarea');
    input.id = 'clipnote-input';
    input.placeholder = 'Take a note at current time...';
    input.rows = 3;
    const addBtn = document.createElement('button');
    addBtn.id = 'clipnote-add';
    addBtn.className = 'clipnote-btn btn-primary';
    addBtn.textContent = 'Add Note @ Timestamp';
    const syncBtn = document.createElement('button');
    syncBtn.id = 'clipnote-sync';
    syncBtn.className = 'clipnote-btn btn-premium';
    syncBtn.textContent = '👑 Sync to Notion (Premium)';
    
    controls.appendChild(input);
    controls.appendChild(addBtn);
    controls.appendChild(syncBtn);

    sidebar.appendChild(header);
    sidebar.appendChild(content);
    sidebar.appendChild(controls);

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
      
      const timeSpan = document.createElement('span');
      timeSpan.className = 'note-time';
      timeSpan.textContent = `[${timeStr}]`;
      note.appendChild(timeSpan);
      note.appendChild(document.createTextNode(` ${text}`));
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
