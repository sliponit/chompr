# chompr

## content

- <a href="./worker">./worker</a> cloudflare worker. Fill `account_id` in `wrangler.toml` and set `TWITTER_TOKEN_BEARER` as variable environment for calling twitter API and add a namespace named `CHOMPR`
- <a href="./app">./app</a> Vue app - fork of https://github.com/auth0-samples/auth0-vue-samples. Set `VITE_API_URL` as variable environment for calling the worker. Auth0 login is disabled for now
