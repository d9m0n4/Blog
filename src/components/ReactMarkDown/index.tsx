import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('jsx', jsx);

interface IMkd {
  text: string;
  img?: string;
}

export const Comp: React.FC<IMkd> = ({ text }) => {
  const customComponents: Components = {
    p: ({ node, children }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeFirstChild: any = node.children[0];
      if (nodeFirstChild.tagName === 'a') {
        const image = nodeFirstChild.properties;
        console.log(image);

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
        <SyntaxHighlighter language={language} style={atomDark}>
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
};
