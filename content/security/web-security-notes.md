---
title: Web Application Security Notes
date: 2026-05-22
category: Security
description: Standard notes regarding CSP, CORS, and modern browser protections.
---

This document summarizes vital web security policies that every modern single-page application must configure.

## Content Security Policy (CSP)

A Content Security Policy prevents cross-site scripting (XSS) and data injection attacks by restricting resources that the browser is allowed to load.

### Key Directives

- `default-src 'self'`: Only load resources from the origin domain.
- `script-src 'self' 'unsafe-inline'`: Allow script execution only from origin and allowed hashes.
- `style-src 'self' 'unsafe-inline'`: Style loading boundaries.

## CORS Configuration

Cross-Origin Resource Sharing is a browser mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin access to selected resources from a different server.

### Essential Headers

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

## Secure Cookie Attributes

Ensure session cookies are protected using the following attributes:

- `Secure`: Ensures cookies are only transmitted over secure HTTPS connections.
- `HttpOnly`: Prevents client-side scripts from accessing cookies, reducing XSS theft risk.
- `SameSite=Strict`: Restricts cookie transfer in cross-site requests, mitigating CSRF risk.
