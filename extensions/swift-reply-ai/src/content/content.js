// Inject Smart Reply button into Gmail Compose window
function injectButton() {
  const dialogs = document.querySelectorAll('div[role="dialog"]');
  dialogs.forEach((dialog) => {
    if (dialog.querySelector('.swift-reply-btn')) return;

    let toolbar = dialog.querySelector('.btC') || dialog.querySelector('.aDh');
    if (!toolbar) {
      const sendBtn = dialog.querySelector('[role="button"][data-tooltip^="Send"]');
      if (sendBtn) {
        toolbar = sendBtn.closest('tr') || sendBtn.parentElement;
      }
    }

    if (toolbar) {
      const btn = document.createElement('button');
      btn.className = 'swift-reply-btn';
      btn.innerText = 'Smart Reply';
      btn.onclick = (e) => showPopup(e, dialog);
      
      const innerToolbar = toolbar.querySelector('.gU.Up') || toolbar;
      if (innerToolbar) {
        innerToolbar.prepend(btn);
      } else {
        toolbar.prepend(btn);
      }
    }
  });
}

async function showPopup(e, dialog) {
  e.preventDefault();
  
  const existing = document.querySelector('.swift-reply-popup');
  if (existing) existing.remove();

  const status = await getLicenseStatus();

  const popup = document.createElement('div');
  popup.className = 'swift-reply-popup';
  
  const rect = e.target.getBoundingClientRect();
  popup.style.top = `${rect.top + window.scrollY - 150}px`;
  popup.style.left = `${rect.left + window.scrollX}px`;

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
        alert(`Upgrade to Premium for $1 Lifetime to unlock ${tone.name} tone!`);
        return;
      }
      
      if (!status.canUse) {
        alert('Free limit reached! Upgrade to Premium for $1 Lifetime for unlimited replies.');
        return;
      }
      
      const originalHTML = btn.innerHTML;
      btn.innerHTML = `Generating...`;
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.7';
      
      try {
        await incrementUsage();
        await insertGeneratedResponse(dialog, tone.name);
        popup.remove();
      } catch (e) {
        console.error(e);
        btn.innerHTML = `Error. Try again.`;
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.pointerEvents = 'auto';
          btn.style.opacity = '1';
        }, 3000);
      }
    };
    
    popup.appendChild(btn);
  });

  document.addEventListener('click', function closePopup(event) {
    if (!popup.contains(event.target) && event.target !== e.target) {
      popup.remove();
      document.removeEventListener('click', closePopup);
    }
  });

  document.body.appendChild(popup);
}

async function insertGeneratedResponse(dialog, tone) {
  const editableBox = dialog.querySelector('div[role="textbox"][aria-label="Message Body"]') || 
                      dialog.querySelector('div[role="textbox"][g_editable="true"]') ||
                      dialog.querySelector('.Am.Al.editable');
  if (editableBox) {
    const responses = {
      'Agree': 'Sounds great to me. I agree.',
      'Decline': 'Unfortunately, I won\'t be able to make it.',
      'Short': 'Got it, thanks.',
      'Professional': 'Thank you for reaching out. I will review this and get back to you shortly.',
      'Witty': 'Challenge accepted! Let\'s do this.'
    };
    
    // Simulate LLM API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const text = responses[tone];
    if (!text) {
      throw new Error('Empty AI response');
    }
    
    const newDiv = document.createElement('div');
    newDiv.textContent = text;
    const br = document.createElement('br');
    
    if (editableBox.firstChild) {
      editableBox.insertBefore(br, editableBox.firstChild);
      editableBox.insertBefore(newDiv, br);
    } else {
      editableBox.appendChild(newDiv);
      editableBox.appendChild(br);
    }
    
    editableBox.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    throw new Error('Compose box not found');
  }
}

let debounceTimer;
const observer = new MutationObserver((mutations) => {
  let shouldInject = false;
  for (const m of mutations) {
    if (m.target && m.target.nodeType === Node.ELEMENT_NODE) {
      if (m.target.getAttribute('role') === 'dialog' || m.target.closest('div[role="dialog"]')) {
        shouldInject = true;
        break;
      }
      // Also check if a dialog was just added
      if (!shouldInject && m.addedNodes.length > 0) {
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE && 
              (node.getAttribute('role') === 'dialog' || node.querySelector('div[role="dialog"]'))) {
            shouldInject = true;
            break;
          }
        }
      }
    }
    if (shouldInject) break;
  }
  
  if (shouldInject) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(injectButton, 250);
  }
});
observer.observe(document.body, { childList: true, subtree: true });
