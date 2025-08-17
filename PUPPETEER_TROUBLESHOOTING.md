# Puppeteer Troubleshooting Guide

## Quick Fix for Puppeteer Issues

If you or another Claude Code instance encounters Puppeteer MCP server issues, follow these steps:

### Issue: "MCP server-puppeteer deprecated" or timeout errors

**Solution**: Use direct Puppeteer integration instead of the MCP server.

### Step-by-Step Instructions

1. **Install Puppeteer directly**:
```bash
npm install puppeteer --save-dev
```

2. **Create a validation script** (example):
```javascript
const puppeteer = require('puppeteer');

async function validateWebPage(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Your validation logic here
  const title = await page.title();
  await page.screenshot({ path: 'validation.png' });
  
  await browser.close();
  return { success: true, title };
}
```

3. **Run validation directly**:
```bash
node your_validation_script.js
```

### Important Notes

- **Web Frontend Projects Only**: Puppeteer validation is only needed for projects with web UI components
- **Not Required For**: Backend APIs, CLI tools, scripts, or non-web projects
- **Alternatives**: If Puppeteer fails, use Playwright or Browserbase as fallbacks

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| MCP server timeout | Use direct npm package instead |
| "Package deprecated" warning | Expected - use direct integration |
| Browser launch fails | Add `--no-sandbox` flag |
| Screenshot not saving | Check file permissions |
| Page load timeout | Increase timeout or use different wait condition |

### Fallback Strategy

If Puppeteer doesn't work at all:

1. **Try Playwright**: `npm install playwright`
2. **Use curl for basic checks**: `curl -I https://your-site.com`
3. **Request human verification**: Document what needs visual checking

### When to Skip Puppeteer

Skip browser validation entirely for:
- Pure backend APIs
- Command-line tools
- Data processing scripts
- Non-visual components
- Database-only operations

### Quick Copy-Paste Solution

For any agent encountering Puppeteer issues, provide this command:

```bash
# Quick fix - install and use Puppeteer directly
npm install puppeteer --save-dev && echo "Puppeteer installed - use require('puppeteer') in Node.js"
```

Then use the test script from `test_puppeteer.js` as a template.