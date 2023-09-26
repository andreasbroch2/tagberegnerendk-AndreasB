import Image from "next/image";
import React from "react";
import Link from "next/link";
const parse = require('html-react-parser');

export default function postConverter(element: String) {
  var cleanJsx = parse(element);
  function reactNodeToImg(node) {
    return React.Children.map(node, (node) => {
      if (!node.type) {
        return node;
      }
      // If node.type is a <a> tag, return a next.js Link with the same props
      else if (node.type === 'a') {
        return React.createElement(Link, { href: node.props.href, className: node.props.className, target: node.props.target }, reactNodeToImg(node.props.children))
      }
      if (node.type === 'img') {
        if (node.props.width && node.props.height) {
          return React.createElement(Image, { src: node.props.src, alt: node.props.alt, width: node.props.width, height: node.props.height, className: node.props.className})
        }
        else {
          return React.createElement(Image, { src: node.props.src, alt: node.props.alt, width: 600, height: 600})
        }

      }
      // If node.type is a heading tag, return a heading with an id of the same as the text
      else if (node.type === 'h2' || node.type === 'h3' || node.type === 'h4' || node.type === 'h5' || node.type === 'h6') {
        var headingElement = React.createElement(node.type, { id: node.props.children }, node.props.children);
        return headingElement;
      }
      else if (node.props && node.props.children != null) {
        React.Children.map(node.props.children, (child) => {
          if (typeof child === 'string') {
            return React.createElement('string', {}, child)
          }
        })
        return React.cloneElement(node, {}, reactNodeToImg(node.props.children));
      }
      else {
        return React.cloneElement(node, {}, null);
      }
    })
  }
  const dom = React.Children.map(cleanJsx, (elementchild) => {
    if (!elementchild.type) {
      return;
    }
    // If node.type is a heading tag, return a heading with an id of the same as the text
    else if (elementchild.type === 'h2' || elementchild.type === 'h3' || elementchild.type === 'h4' || elementchild.type === 'h5' || elementchild.type === 'h6') {
      var headingElement = React.createElement(elementchild.type, { id: elementchild.props.children }, elementchild.props.children);
      return headingElement;
    }
    else if (elementchild.props && elementchild.props.children) {
      return React.cloneElement(elementchild, {}, reactNodeToImg(elementchild.props.children));
    }
    else {
      return elementchild;
    }
  })
  return dom;
}
