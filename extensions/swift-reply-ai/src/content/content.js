// Inject AI Reply button into Gmail Compose window
function injectButton() {
  const composeWindows = document.querySelectorAll('.aDh'); // Gmail compose bottom bar container
  composeWindows.forEach((composeWindow) => {
    if (!composeWindow.querySelector('.swift-reply-btn')) {
      const btn = document.createElement('button');
      btn.className = 'swift-reply-btn';
      btn.innerText = '✨ AI Reply';
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
  header.innerHTML = `<strong>SwiftReply AI</strong><br><small>${status.isPremium ? 'Premium Active' : `${status.freeLimit - status.usageCount} free replies left`}</small>`;
  popup.appendChild(header);

  tones.forEach(tone => {
    const btn = document.createElement('div');
    btn.className = `swift-reply-tone ${tone.premium && !status.isPremium ? 'locked' : ''}`;
    btn.innerHTML = tone.name + (tone.premium && !status.isPremium ? ' 🔒' : '');
    
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
      insertMockResponse(composeWindow, tone.name);
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

function insertMockResponse(composeWindow, tone) {
  const editableBox = composeWindow.closest('table').parentNode.querySelector('div[contenteditable="true"]');
  if (editableBox) {
    const responses = {
      'Agree': 'Sounds great to me. I agree.',
      'Decline': 'Unfortunately, I won\'t be able to make it.',
      'Short': 'Got it, thanks.',
      'Professional': 'Thank you for reaching out. I will review this and get back to you shortly.',
      'Witty': 'Challenge accepted! Let\'s do this.'
    };
    editableBox.innerHTML = `<div>${responses[tone] || 'Mock AI response...'}</div><br>` + editableBox.innerHTML;
  }
}

// Observe DOM for compose window
const observer = new MutationObserver(injectButton);
observer.observe(document.body, { childList: true, subtree: true });
