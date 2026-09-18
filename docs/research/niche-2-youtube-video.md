# Market Research: YouTube & Video Enhancement

**Researcher**: YouTube Tools Researcher (Subagent)  
**Date**: 2026-09-18  
**Niche**: YouTube & Video Enhancement  
**Business Model**: Freemium

---

## Executive Summary

YouTube tools category has **30M+ aggregate installs** across top extensions. Market is split:
- **Commoditized/High-Risk**: Speed control, ad-blocking, downloading (free/banned)
- **High-Growth Zone**: Study tools, note-taking, Shorts control, audio processing

## Top Competitors

| Extension | Installs | Rating | Pricing | Category |
|---|---|---|---|---|
| **Volume Master** | 7M+ | 4.81/5 (49K) | Free | Audio |
| **vidIQ** | 4M+ | 4.5/5 (11.2K) | Free/$7.50-39/mo | Creator SEO |
| **Return YouTube Dislike** | 4M+ | 4.5/5 (5K) | Free/OSS | UI Fix |
| **Video Speed Controller** | 3M+ | 4.5/5 (3.6K) | Free/OSS | Playback |
| **SponsorBlock** | 2M+ | 4.6/5 (3.5K) | Free/Donate | Ad Skip |
| **Language Reactor** | 2M+ | 4.17/5 (4.3K) | Free/$6.39/mo | Language |
| **Enhancer for YouTube** | 1M+ | 4.7/5 (17.5K) | Free/Donate | All-in-one |
| **Unhook** | 1M+ | 4.86/5 (4.5K) | Free/Donate | Focus |
| **NoteGPT** | 400K+ | 4.92/5 (8K) | Free/$4.99-9.99/mo | Study/AI |

## Search Volume

- "ai video summarizer": **180K-300K**/mo (surging!)
- "video speed controller": **150K-250K**/mo (commodity, no pay intent)
- "youtube chrome extension": **90K-160K**/mo
- "youtube notes": **25K-45K**/mo (**highest conversion intent**)
- "youtube shorts blocker": **40K-80K**/mo (growing rapidly)

## ⚠️ TOS Risks

- **Video Downloading**: STRICTLY BANNED on CWS → developer account termination
- **Ad-Blocking**: HIGH RISK → MV3 restrictions + Google cat-and-mouse
- **Trademarks**: Can't use "YouTube" in name directly, use "[Brand] for YouTube™"
- **DOM Fragility**: Use HTML5 media APIs, not YouTube's Polymer selectors

## Gaps & Opportunities

1. **Note-Taking Gap**: No good video study tool with screenshots + Notion/Obsidian sync
2. **Shorts UX Gap**: No scrubber, no speed control on desktop Shorts
3. **Audio Dynamic Range**: Volume boosters boost everything, no smart dialogue clarity
4. Users **won't pay** for speed/UI tweaks but **will pay** for Notion sync, AI summaries, study features

## Recommended Extension: "ClipNote for YouTube™"

**Video study sidebar with timestamped notes, screenshots, and Notion/Obsidian sync**

### Free vs Premium Split
| Free | Premium ($9.99 once or $2.99/mo) |
|------|-------|
| In-player study sidebar | Notion sync |
| Unlimited timestamped notes | Obsidian vault export |
| 15 screenshots per video | Unlimited 4K screenshots |
| A-B looping | Anki flashcard export |
| Markdown export | AI chapter summaries |
| | Cross-device cloud sync |

### Technical Approach
- Canvas API for screenshots (100% TOS compliant)
- Cloudflare Worker for Notion OAuth proxy only
- Pure frontend, minimal backend

## ICE Score

| Dimension | Score |
|-----------|-------|
| Impact | 8.5/10 |
| Confidence | 9.0/10 |
| Ease | 8.0/10 |
| **Total** | **8.5/10** |

**Difficulty**: 4/10 (pure frontend, Canvas API, no audio complexity for MVP)
