# elparadisogonzalo.com — Production Deploy Script

This repository contains a **Termux-based production deploy script** for `elparadisogonzalo.com`. It automates updating your website for **public browsing and FTP sharing** using a GitHub-based workflow.

---

## Features

- Automatically generates a **responsive `index.html`** for public browsing.
- Links your **`/public`** and **`/ftp`** folders for easy access.
- Commits and pushes local changes to **GitHub**.
- Pulls remote updates to prevent non-fast-forward errors.
- Optional server-side pull if you have SSH access.
- Mobile-friendly and lightweight — ideal for Termux.

---

## Prerequisites

- **Termux** installed on Android.
- **Git** installed:

```bash
pkg update
pkg install git
