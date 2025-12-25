import {Marked} from "marked";
import sanitizeHtml from "sanitize-html";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";
import {getHeadingList, gfmHeadingId, HeadingData} from "marked-gfm-heading-id";

export type MarkdownToHtmlResult = {
  html: string;
  tableOfContents: TableOfContentsNode[];
}

export interface TableOfContentsNode extends HeadingData {
  children: TableOfContentsNode[];
}

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  gfmHeadingId({ prefix: "wiki-heading-" })
)

export function convertMarkdownToHtml(
  markdown: string,
  additionalAllowedTags?: string[],
  additionalAllowedAttributes?: {[key: string]: string[]}
  ): MarkdownToHtmlResult {
  const rawHtml = marked.parse(markdown, {
    async: false,
    gfm: true
  }) as string;

  const headings = getHeadingList()

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
        'img': ["src", "alt", "title", "width", "height", "loading"],
        h1: ['id'],
        h2: ['id'],
        h3: ['id'],
        h4: ['id'],
        h5: ['id'],
        h6: ['id'],
      }
    }

  return {
    html: sanitizeHtml(rawHtml, {
      allowedTags,
      allowedAttributes
    }),
    tableOfContents: buildTree(headings)
  }
}

function buildTree(headings: HeadingData[]): TableOfContentsNode[] {
  const root: TableOfContentsNode[] = [];
  const stack: TableOfContentsNode[] = [];

  headings.forEach((heading) => {
    const node: TableOfContentsNode = { ...heading, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length > 0) {
      stack[stack.length - 1].children.push(node);
    } else {
      root.push(node);
    }

    stack.push(node);
  });

  return root;
}
