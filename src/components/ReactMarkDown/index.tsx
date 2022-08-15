import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';

import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface IMkd {
  text: string;
  img?: string;
}

export const Comp: React.FC<IMkd> = React.memo(({ text }) => {
  const customComponents: Components = {
    p: ({ node, children }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeFirstChild: any = node.children[0];
      if (nodeFirstChild.tagName === 'a') {
        const image = nodeFirstChild.properties;

        return (
          <div className="post-detail__image">
            <img src={image.href} alt={image.alt} width={600} height={300} />
          </div>
        );
      }

      return <p>{children}</p>;
    },
    code: (code: any) => {
      const { className, children } = code;
      const language = className ? (className as string).replace('language-', '') : 'js';
      return (
        <SyntaxHighlighter
          wrapLongLines
          wrapLines
          language={language}
          style={atomDark}
          showLineNumbers>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={customComponents}
    />
  );
});
