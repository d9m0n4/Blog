import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';

import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface IMkd {
  text: string;
  img?: string;
}

export const Comp: React.FC<IMkd> = React.memo(({ text }) => {
  const customComponents: Components = {
    p: ({ node, children }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeFirstChild: any = node.children[0];
      if (nodeFirstChild.tagName === 'img') {
        const image = nodeFirstChild.properties;
        console.log(image);

        return (
          <div className="post__image">
            <img className="img" src={image.src} alt={image.alt} />
          </div>
        );
      }

      return <Typography>{children}</Typography>;
    },
    code: (code: any) => {
      const { className, children } = code;
      const language = className ? (className as string).replace('language-', '') : null;
      return language ? (
        <SyntaxHighlighter
          customStyle={{ maxWidth: '1152px', margin: '0 auto' }}
          wrapLongLines
          wrapLines
          language={language}
          style={atomDark}
          showLineNumbers>
          {children}
        </SyntaxHighlighter>
      ) : (
        <>{children}</>
      );
    },
    pre: ({ node, children }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeFirstChild: any = node.children[0];

      if (nodeFirstChild.tagName === 'code' && !nodeFirstChild.properties.className) {
        return <code className="inline__code">{children}</code>;
      }
      return <pre>{children}</pre>;
    },
    table: (props) => {
      return (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            {props.children}
          </Table>
        </TableContainer>
      );
    },

    th: (props) => {
      return (
        <TableCell>
          <Typography sx={{ fontWeight: '600' }}>{props.children}</Typography>
        </TableCell>
      );
    },

    td: (props) => {
      return (
        <TableCell>
          <Typography>{props.children}</Typography>
        </TableCell>
      );
    },

    tr: (props) => {
      return <TableRow>{props.children}</TableRow>;
    },

    tbody: (props) => {
      return <TableBody>{props.children}</TableBody>;
    },

    thead: (props) => {
      return <TableHead>{props.children}</TableHead>;
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
