# Troubleshooting — Common Problems & Solutions

> Reference guide for known issues and how to resolve them.

---

## 🔧 Chrome Extension Development

### Problem: Extension not loading after changes
**Solution**: 
1. Go to `chrome://extensions`
2. Click "Update" or toggle the extension off/on
3. If still broken, remove and re-load unpacked
4. Check DevTools console for errors

### Problem: Content script not injecting
**Solution**:
1. Verify `matches` pattern in manifest.json
2. Check that the page URL matches the pattern
3. Ensure `content_scripts` array is correctly formatted
4. Try reloading the target page after extension update

### Problem: chrome.storage.sync quota exceeded
**Solution**:
- `sync` has 100KB total, 8KB per item limit
- Move large data to `chrome.storage.local` (5MB limit)
- Compress data before storing (JSON → compressed string)

### Problem: Service worker becoming inactive
**Solution**:
- This is expected in MV3 — service workers are ephemeral
- Use `chrome.alarms` for periodic tasks (not setInterval)
- Use `chrome.storage` to persist state (not in-memory variables)
- Re-register listeners at top level of service worker

### Problem: CORS errors when calling backend API
**Solution**:
1. Verify `host_permissions` in manifest.json includes the API domain
2. Check backend CORS headers include extension origin
3. Use `chrome.runtime.id` based origin: `chrome-extension://<id>`

---

## 💰 Payment & Licensing

### Problem: Webhook not received from payment provider
**Solution**:
1. Verify webhook URL is publicly accessible
2. Check payment provider dashboard for webhook delivery logs
3. Ensure webhook signature validation is correct
4. Test with payment provider's webhook testing tool

### Problem: License validation failing for paid users
**Solution**:
1. Check if license key format is correct
2. Verify backend API is running and accessible
3. Check if license has expired
4. Test with a known-good license key
5. Check `chrome.storage.sync` for stored license data

---

## 🏗️ Build & Deploy

### Problem: Chrome Web Store rejection
**Common reasons**:
- Requesting unnecessary permissions → remove unused permissions
- Missing privacy policy → add privacy policy URL
- Description doesn't match functionality → update description
- Remote code execution → remove any external script loading
- Single purpose violation → ensure extension has one clear purpose

### Problem: Git merge conflicts
**Solution**:
1. Always pull latest before starting work
2. Work in feature branches
3. Keep changes small and focused
4. Resolve conflicts in feature branch before merging to develop

---

## 🔍 Debugging Tips

1. **Chrome DevTools**: Right-click extension icon → "Inspect popup" for popup debugging
2. **Background page logs**: `chrome://extensions` → "Service Worker" link
3. **Content script logs**: Regular page DevTools console
4. **Storage viewer**: DevTools → Application → Storage → Extension Storage
5. **Network requests**: DevTools → Network tab (filter by extension)

---

> **Add new problems and solutions here as they're discovered.**
