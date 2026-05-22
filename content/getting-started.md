---
title: Getting Started with Digital Knowledge Base
date: 2026-05-22
category: Guide
description: An introduction to this high-performance, minimalist digital knowledge base.
---

This is a high-performance digital knowledge base website. It is designed to help developers organize their notes, guides, and thoughts in a clean, paper-like design.

## Architecture

This project is built on top of the latest technology stack:

- Next.js 15 (App Router)
- React 19
- Velite for static document generation
- FlexSearch for offline full-text search

### Rendering Flow

The documents are built ahead-of-time (static site generation). When a change occurs, the build system parses the Markdown files and generates static HTML files.

```typescript
// Example config snippet
const config = {
  output: 'export',
  reactCompiler: true
};
```

## Layout Details

The visual layout focuses on reading comfort. There are no distracting animations or heavy card backgrounds. Instead, simple line dividers organize the content.

### Multi-device Behavior

On desktop screens, the left sidebar displays the document hierarchy tree, and the right sidebar contains the current page's Table of Contents. On mobile screens, these sidebars collapse into drawer menus.
