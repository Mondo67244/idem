## 2026-02-12 - Critical Vulnerability: Unauthenticated Access to Contact Data
**Vulnerability:** The `/api/contact` endpoints (`GET /`, `GET /:id`, `PATCH /:id/status`) were completely public, allowing anyone to list all contact form submissions (containing names, emails, messages).
**Learning:** Comments indicating "would need authentication middleware in production" are dangerous if not acted upon. Code reviews should flag such comments as blockers for merging to production-ready branches.
**Prevention:**
1. Use `authenticate` middleware by default on all new routes unless explicitly public.
2. Implement and use `requireAdmin` middleware for sensitive data access.
3. Add tests that specifically check for 401/403 on sensitive endpoints.
