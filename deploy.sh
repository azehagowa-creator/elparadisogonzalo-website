#!/data/data/com.termux/files/usr/bin/bash

# Production-ready deploy script for elparadisogonzalo.com
# Works with GitHub → server pull workflow

# --- Configuration ---
PROJECT_DIR="$HOME/public"
REPO_URL="https://github.com/azehagowa-creator/elparadisogonzalo-website.git"
REMOTE_DIR="public_html"  # server folder to serve website

# --- Functions ---
function create_index() {
  cat > "$PROJECT_DIR/index.html" <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>elparadisogonzalo.com</title>
<style>
body { font-family: Arial, sans-serif; background:#f4f4f4; color:#333; text-align:center; padding:50px; }
header { background:#1a73e8; color:white; padding:20px 0; margin-bottom:40px; border-radius:8px; }
a { color:#1a73e8; text-decoration:none; font-weight:bold; }
a:hover { text-decoration:underline; }
footer { margin-top:50px; font-size:0.9em; color:#666; }
</style>
</head>
<body>
<header><h1>Welcome to elparadisogonzalo.com</h1></header>
<main>
<p>This is the main landing page for FTP and public sharing.</p>
<p>Browse publicly shared content below:</p>
<ul>
<li><a href="public/">Public Folder</a></li>
<li><a href="ftp/">FTP Uploads</a></li>
</ul>
</main>
<footer>&copy; 2026 elparadisogonzalo.com | All rights reserved</footer>
</body>
</html>
EOF
}

# --- Main Deploy Workflow ---
cd "$PROJECT_DIR" || { echo "Error: project folder not found: $PROJECT_DIR"; exit 1; }

# 1. Create/update production index.html
create_index

# 2. Commit changes
git add .
git commit -m "Deploy $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit."

# 3. Pull remote changes with rebase to prevent conflicts
git pull origin master --rebase || echo "Rebase failed; check conflicts manually."

# 4. Push to GitHub
git push origin master || echo "Push failed; check your GitHub credentials."

# 5. Optional: server-side pull (requires SSH access)
# ssh azehagowa@elparadisogonzalo.com "cd $REMOTE_DIR && git pull origin master"

echo "✅ Production deploy complete."
