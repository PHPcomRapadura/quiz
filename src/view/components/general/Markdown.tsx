/* eslint-disable @typescript-eslint/ban-ts-comment */
import { markdown } from 'markdown'

export type MarkdownProps = {
  text: string
  tag?: string
}

export function Markdown ({ text, tag }: MarkdownProps) {
  const Tag = tag || 'span'
  const parse = function (string: string) {
    string = markdown.toHTML(string + '')
    string = string.replace('block<code>', '<pre><code>')
    string = string.replace('</code>block', '</code></pre>')
    return string
  }
  // @ts-ignore
  return <Tag dangerouslySetInnerHTML={{ __html: parse(text) }}/>
}
