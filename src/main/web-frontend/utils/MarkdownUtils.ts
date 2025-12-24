import {Marked} from "marked";
import sanitizeHtml from "sanitize-html";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
)

export function convertMarkdownToHtml(
  markdown: string,
  additionalAllowedTags?: string[],
  additionalAllowedAttributes?: {[key: string]: string[]}
  ): string {
  const rawHtml = marked.parse(markdown, {
    async: false,
    gfm: true
  }) as string;

  const allowedTags =
    sanitizeHtml.defaults.allowedTags
      .concat(additionalAllowedTags ?? [])
      .concat(['span', 'h1', 'h2', 'img'])

  const allowedAttributes =
    {
      ...sanitizeHtml.defaults.allowedAttributes,
      ...(additionalAllowedAttributes ?? {}),
      ...{
        'span': ['class'],
        'code': ['class'],
        'img': ["src", "alt", "title", "width", "height", "loading"]
      }
    }

  return sanitizeHtml(rawHtml, {
    allowedTags,
    allowedAttributes
  });
}