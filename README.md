# Okasie Partner API documentation

Source of the public documentation of the Okasie Partner API, published by
Mintlify at https://docs.okasie.be (also https://okasie.mintlify.app).

The API itself lives in the `okasie-web` repository
(`app/api/external/v1`). When an endpoint, field or error changes there,
update the matching page and `openapi.yaml` here in the same week.

## Layout

- `docs.json`: site configuration and navigation.
- `introduction.mdx`, `quickstart.mdx`, `authentication.mdx`, `errors.mdx`,
  `rate-limiting.mdx`, `guides/`: the documentation tab.
- `api-reference/`: one page per endpoint.
- `nl/`: Dutch versions of the getting-started pages.
- `openapi.yaml`: the full specification.
- `tests/`: checks that every page in the navigation exists and that only
  public documentation is published. Run them with `node --test tests/*.test.mjs`.

Everything on a push to `main` is published. `.mintignore` keeps the
repository files (this README, `AGENTS.md`, `tests/`, `.github/`) off the
site.

## Preview

```bash
npx mint dev
```
