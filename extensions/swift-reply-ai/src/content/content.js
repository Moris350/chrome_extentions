// Inject Smart Reply button into Gmail Compose window
function injectButton() {
  const composeWindows = document.querySelectorAll('.aDh'); // Gmail compose bottom bar container
  composeWindows.forEach((composeWindow) => {
    if (!composeWindow.querySelector('.swift-reply-btn')) {
      const btn = document.createElement('button');
      btn.className = 'swift-reply-btn';
      btn.innerText = 'Smart Reply';
      btn.onclick = (e) => showPopup(e, composeWindow);
      
      const toolbar = composeWindow.querySelector('.gU.Up'); // Toolbar inside compose
      if (toolbar) {
        toolbar.prepend(btn);
      }
    }
  });
}

async function showPopup(e, composeWindow) {
  e.preventDefault();
  
  // Remove existing popup if any
  const existing = document.querySelector('.swift-reply-popup');
  if (existing) existing.remove();

  const status = await getLicenseStatus();

  const popup = document.createElement('div');
  popup.className = 'swift-reply-popup';
  
  // Position near the button
  const rect = e.target.getBoundingClientRect();
  popup.style.top = `${rect.top - 150}px`;
  popup.style.left = `${rect.left}px`;

  const tones = [
    { name: 'Agree', premium: false },
    { name: 'Decline', premium: false },
    { name: 'Short', premium: false },
    { name: 'Professional', premium: true },
    { name: 'Witty', premium: true }
  ];

  const header = document.createElement('div');
  header.innerHTML = `<strong>SwiftReply</strong><br><small>${status.isPremium ? 'Premium Active' : `${status.freeLimit - status.usageCount} free replies left`}</small>`;
  popup.appendChild(header);

  tones.forEach(tone => {
    const btn = document.createElement('div');
    btn.className = `swift-reply-tone ${tone.premium && !status.isPremium ? 'locked' : ''}`;
    
    let innerHTML = tone.name;
    if (tone.premium && !status.isPremium) {
      innerHTML += ` <svg class="icon-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
    }
    btn.innerHTML = innerHTML;
    
    btn.onclick = async () => {
      if (tone.premium && !status.isPremium) {
        alert(`Upgrade to Premium for $2.99/mo to unlock ${tone.name} tone!`);
        return;
      }
      
      if (!status.canUse) {
        alert('Free limit reached! Upgrade to Premium for $2.99/mo for unlimited replies.');
        return;
      }
      
      await incrementUsage();
      insertGeneratedResponse(composeWindow, tone.name);
      popup.remove();
    };
    
    popup.appendChild(btn);
  });

  // Close when clicking outside
  document.addEventListener('click', function closePopup(event) {
    if (!popup.contains(event.target) && event.target !== e.target) {
      popup.remove();
      document.removeEventListener('click', closePopup);
    }
  });

  document.body.appendChild(popup);
}

function insertGeneratedResponse(composeWindow, tone) {
  const editableBox = composeWindow.closest('table').parentNode.querySelector('div[contenteditable="true"]');
  if (editableBox) {
    const responses = {
      'Agree': 'Sounds great to me. I agree.',
      'Decline': 'Unfortunately, I won\'t be able to make it.',
      'Short': 'Got it, thanks.',
      'Professional': 'Thank you for reaching out. I will review this and get back to you shortly.',
      'Witty': 'Challenge accepted! Let\'s do this.'
    };
    editableBox.innerHTML = `<div>${responses[tone] || 'Generating response...'}</div><br>` + editableBox.innerHTML;
  }
}

// Observe DOM for compose window
const observer = new MutationObserver(injectButton);
observer.observe(document.body, { childList: true, subtree: true });
