# Okasie Partner API documentation

Guidance for Claude Code and other agents working in this repository.

- This is the public reference of the Okasie Partner API, built by Mintlify
  from the root of this repository on every push to `main`
  (https://docs.okasie.be). Everything here is public: no internal notes,
  customer data, real API keys or real dealer data.
- The API code lives in `okasie/okasie-web` (`app/api/external/v1`). Describe
  what the code does; check the code before documenting a field, limit or
  error, and keep `openapi.yaml` in line with the pages.
- Write in English (pages under `nl/` in Dutch), second person, active voice,
  sentence-case headings, a language tag on every code block, root-relative
  internal links without file extensions.
- A new page goes in the `docs.json` navigation.
- Before pushing: `node --test tests/*.test.mjs`. Work on a branch and open a pull
  request; `main` is the live site.
