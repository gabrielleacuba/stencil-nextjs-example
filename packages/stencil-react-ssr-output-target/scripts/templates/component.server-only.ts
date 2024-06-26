/* eslint-disable */
import React from 'react';
// @ts-expect-error - leads only to error in template file
import { renderToString } from './hydrate';
// @ts-expect-error - leads only to error in template file
import { toNativeProps } from './lib/native-props';

const stylePattern = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const bodyPattern = /<body[^>]*>([\s\S]*?)<\/body>/i;
const openTagPattern = /<__ELEMENT_TAG_PREFIX__-([^>\s]+)([^>]*)>/g;
const closeTagPattern = /<\/__ELEMENT_TAG_PREFIX__-([^>\s]+)>/g;

const toHtml = async ({ children, ...props }) => {
  const nativeProps = Object.entries(toNativeProps(props)).reduce(
    (result, [key, value]) => `${result} ${key}="${value}"`,
    '',
  );
  const { html } = await renderToString(
    `<__ELEMENT_NAME__${nativeProps}>${typeof children === 'string' ? children : ''}</__ELEMENT_NAME__>`,
    { removeScript: true, afterHydrate: true },
  );

  const styles = html.match(stylePattern) ?? [];
  const style = styles.map((style) => style.replace(stylePattern, '$1')).join('');

  const body = (html.match(bodyPattern) ?? [])[1] ?? '';
  const component = body
    .replace(openTagPattern, '<span data-tag="__ELEMENT_TAG_PREFIX__-$1"$2>')
    .replace(closeTagPattern, '</span>');

  return `<style>${style}</style>${component}`;
};

export const __PASCAL_CASE_ELEMENT_NAME__ServerOnly = async (props) =>
  React.createElement('span', { dangerouslySetInnerHTML: { __html: await toHtml(props) } });

export const static__PASCAL_CASE_ELEMENT_NAME__HtmlServerOnly = toHtml;
