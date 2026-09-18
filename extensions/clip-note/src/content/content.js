(function() {
  if (document.getElementById('clipnote-sidebar')) return;

  async function extractTranscript(currentTime, duration = 180) {
    let segments = Array.from(document.querySelectorAll('ytd-transcript-segment-renderer'));
    
    if (segments.length === 0) {
      // Try to open transcript if it's closed
      const expandBtns = document.querySelectorAll('button');
      for (const btn of expandBtns) {
        if (btn.textContent.toLowerCase().includes('show transcript')) {
          btn.click();
          break;
        }
      }
      await new Promise(r => setTimeout(r, 1500));
      segments = Array.from(document.querySelectorAll('ytd-transcript-segment-renderer'));
    }

    if (segments.length === 0) {
      return null;
    }

    let text = "";
    for (let seg of segments) {
      const timeElem = seg.querySelector('.segment-timestamp');
      const textElem = seg.querySelector('.segment-text');
      if (!timeElem || !textElem) continue;
      
      const timeParts = timeElem.textContent.trim().split(':').map(Number);
      let sec = 0;
      if (timeParts.length === 3) sec = timeParts[0]*3600 + timeParts[1]*60 + timeParts[2];
      else if (timeParts.length === 2) sec = timeParts[0]*60 + timeParts[1];
      else sec = timeParts[0] || 0;
      
      if (sec >= currentTime && sec <= currentTime + duration) {
        text += textElem.textContent.trim() + " ";
      }
    }
    
    return text.trim();
  }

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

    const summarizeBtn = document.createElement('button');
    summarizeBtn.id = 'clipnote-summarize';
    summarizeBtn.className = 'clipnote-btn btn-secondary';
    summarizeBtn.textContent = 'Summarize Section (AI)';
    summarizeBtn.style.marginTop = '8px';
    summarizeBtn.style.backgroundColor = '#10a37f';
    summarizeBtn.style.color = 'white';
    
    const syncBtn = document.createElement('button');
    syncBtn.id = 'clipnote-sync';
    syncBtn.className = 'clipnote-btn btn-premium';
    syncBtn.textContent = '👑 Sync to Notion (Premium)';
    syncBtn.style.marginTop = '8px';
    
    controls.appendChild(input);
    controls.appendChild(addBtn);
    controls.appendChild(summarizeBtn);
    controls.appendChild(syncBtn);

    sidebar.appendChild(header);
    sidebar.appendChild(content);
    sidebar.appendChild(controls);

    const container = document.querySelector('ytd-watch-flexy') || document.body;
    container.appendChild(sidebar);

    document.getElementById('clipnote-close').addEventListener('click', () => {
      sidebar.style.display = 'none';
    });

    document.getElementById('clipnote-add').addEventListener('click', () => {
      const video = document.querySelector('video');
      const time = video ? Math.floor(video.currentTime) : 0;
      const text = document.getElementById('clipnote-input').value;
      if (!text) return;
      
      addNoteToUI(time, text);
      document.getElementById('clipnote-input').value = '';
    });

    document.getElementById('clipnote-summarize').addEventListener('click', async () => {
      const video = document.querySelector('video');
      const time = video ? Math.floor(video.currentTime) : 0;
      
      const btn = document.getElementById('clipnote-summarize');
      const originalText = btn.textContent;
      btn.textContent = 'Extracting transcript...';
      btn.disabled = true;
      
      try {
        const transcript = await extractTranscript(time, 180);
        if (!transcript) {
          alert('Could not find transcript. Please ensure the transcript is open or available for this video.');
          return;
        }

        let noteText = transcript;
        btn.textContent = 'Summarizing...';

        if (window.ai && window.ai.languageModel) {
          try {
            const session = await window.ai.languageModel.create();
            noteText = await session.prompt(`Summarize this transcript concisely: \n\n${transcript}`);
          } catch (e) {
            console.error('AI Summary failed, using raw transcript.', e);
          }
        }
        
        addNoteToUI(time, `[Summary] ${noteText}`);
      } catch (err) {
        console.error(err);
        alert('An error occurred during summarization.');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });

    document.getElementById('clipnote-sync').addEventListener('click', async () => {
      const isPremium = window.ClipNoteLicense && await window.ClipNoteLicense.checkPremiumStatus();
      if (!isPremium) {
        alert('Notion Sync requires Premium ($1). Upgrade today!');
      } else {
        alert('Syncing to Notion...');
      }
    });
  }

  let currentVideoId = null;

  function getVideoId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('v');
  }

  function loadNotes() {
    if (!currentVideoId) return;
    const content = document.getElementById('clipnote-content');
    if (content) content.innerHTML = '';
    
    chrome.storage.local.get([currentVideoId], (result) => {
      const notes = result[currentVideoId] || [];
      notes.forEach(note => {
        addNoteToUIDom(note.time, note.text);
      });
    });
  }

  function saveNote(time, text) {
    if (!currentVideoId) return;
    chrome.storage.local.get([currentVideoId], (result) => {
      const notes = result[currentVideoId] || [];
      notes.push({ time, text });
      chrome.storage.local.set({ [currentVideoId]: notes });
    });
  }

  function addNoteToUIDom(time, text) {
    const content = document.getElementById('clipnote-content');
    if (!content) return;
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
  }

  function addNoteToUI(time, text) {
    addNoteToUIDom(time, text);
    saveNote(time, text);
  }

  function injectSidebar() {
    const checkInterval = setInterval(() => {
      const container = document.querySelector('ytd-watch-flexy') || document.body;
      if (container) {
        clearInterval(checkInterval);
        if (!document.getElementById('clipnote-sidebar')) {
          createSidebar();
        }
        loadNotes();
      }
    }, 500);
  }

  function handleNavigation() {
    const newVideoId = getVideoId();
    if (newVideoId && newVideoId !== currentVideoId) {
      currentVideoId = newVideoId;
      injectSidebar();
      const sidebar = document.getElementById('clipnote-sidebar');
      if (sidebar) sidebar.style.display = 'block';
    } else if (!newVideoId) {
      currentVideoId = null;
      const sidebar = document.getElementById('clipnote-sidebar');
      if (sidebar) sidebar.style.display = 'none';
    }
  }

  document.addEventListener('yt-navigate-finish', handleNavigation);

  // Initialize
  handleNavigation();
})();
