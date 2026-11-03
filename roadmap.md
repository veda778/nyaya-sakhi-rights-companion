# Roadmap — NYAYA SAKHI

Decisions (confirmed by user):
- Backend: Lovable Cloud for the working app + separate FastAPI backend codebase generated as a downloadable deliverable for academic submission.
- Chat: multiple saved threads per user (thread list + dedicated thread routes), DB persistence.
- Starter data: clearly-labelled demo starter dataset (legal corpus, schemes, helplines), admin-expandable.

## Phase 1 — Foundation
- [ ] Enable Lovable Cloud
- [ ] DB migration: profiles, user_roles, chat_sessions, chat_messages, legal_documents, legal_document_chunks (pgvector), legal_sources, government_schemes, complaint_drafts, emergency_contacts + GRANTs + RLS
- [ ] Seed labelled starter data (Acts/sections, schemes, helplines)
- [ ] Design tokens (deep purple / soft lavender / pink accent) in src/styles.css
- [ ] Landing page (/), auth pages, dashboard

## Phase 2 — RAG chatbot
- [ ] Gateway helpers (server-only), embeddings (pgvector), retrieval threshold
- [ ] Chat streaming route with citations + refusal safety + citation validation
- [ ] Thread list, thread pages, clear/delete history, suggested questions, copy

## Phase 3 — Content modules
- [ ] Know Your Rights (acts browser + provision detail)
- [ ] Government Schemes (browse/search/filter + eligibility questionnaire)
- [ ] Complaint & Application drafter (templates, guided form, editable draft, PDF export)
- [ ] Legal Aid directory + Emergency helplines page

## Phase 4 — Multilingual & voice
- [ ] EN/HI/KN language selector + i18n
- [ ] Voice input (Web Speech API) + TTS output with setup-missing fallback

## Phase 5 — Admin + profile
- [ ] Admin dashboard (role-gated): document upload/ingest, chunk+embed, schemes CRUD, emergency contacts CRUD, usage stats
- [ ] User profile, history, saved info, delete options

## Phase 6 — FastAPI backend deliverable
- [ ] Generate full FastAPI backend source (APIs, models, RAG pipeline, requirements.txt, README) in /mnt/documents

## Phase 7 — Verification
- [ ] Build/typecheck green, tests, Playwright end-to-end user journey
- [ ] Head metadata on every route
