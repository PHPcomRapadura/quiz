/* eslint-disable @typescript-eslint/ban-ts-comment */
import { markdown } from 'markdown'

export type MarkdownProps = {
  text: string
  tag?: string
}

export function Markdown ({ text, tag }: MarkdownProps) {
  const Tag = (tag || 'span')
  const parse = function (string: string) {
    return markdown.toHTML(string + '')
      .replace('<br>', "\n")
      .replace('block<code>', '<pre><code>')
      .replace('</code>block', '</code></pre>')
  }
  // @ts-ignore
  return <Tag dangerouslySetInnerHTML={{ __html: parse(text) }} />
}
