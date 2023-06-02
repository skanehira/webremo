# webremo
Unofficial Web application for [Nature Remo](https://nature.global/nature-remo/)

<p float="left">
  <img src="https://i.gyazo.com/fa171be89288ff94c82d1c5cba58abf8.png" width="400" />
  <img src="https://i.gyazo.com/ca229dc415ac52410d2d69ef6da83b02.png" width="400" /> 
</p>

## Requirements
- Rust
- Node.js
  - pnpm

## Usage

```sh
# run dev server for front
$ pnpm dev

# run proxy server that written in Rust
# Nature Remo API has CORS protection, so we should bypass request
$ cargo run
```
