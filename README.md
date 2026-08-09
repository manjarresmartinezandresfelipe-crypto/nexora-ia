[README.md](https://github.com/user-attachments/files/30876517/README.md)
# Nexora AI — Complete Website Package

## Files

- `index.html` — complete website, SEO metadata and AI chat UI
- `style.css` — complete responsive design and chatbot styling
- `script.js` — navigation, animations, contact form and chatbot connection
- `robots.txt` — search engine crawler rules
- `sitemap.xml` — sitemap for Google
- `worker/worker.js` — secure Cloudflare Worker backend for Gemini
- `worker/README.md` — chatbot setup instructions

## GitHub Pages

Upload the five website files to the root of your repository:

- index.html
- style.css
- script.js
- robots.txt
- sitemap.xml

Do not put the Worker inside the public website root unless you know how you are deploying it. Deploy `worker/worker.js` separately as a Cloudflare Worker.

## Contact

ianexora3@gmail.com

## Important

The AI chatbot UI works immediately, but it will display a setup message until `CHATBOT_API_URL` in `script.js` is set to your deployed Cloudflare Worker URL.

Never put your Gemini API key in this repository.
