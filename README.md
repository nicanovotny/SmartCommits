# SmartCommits

🤖 **AI-powered commit message generator for VS Code**

SmartCommits is a Visual Studio Code extension that leverages Google Gemini AI to automatically generate meaningful, descriptive commit messages based on your staged changes. Say goodbye to generic commit messages and hello to clear, informative descriptions of your code changes.

## ✨ Features

### 🎯 **Intelligent Commit Suggestions**
- Analyzes your staged git changes using Google Gemini AI
- Generates descriptive, conventional commit messages
- Provides explanations for suggested messages

### 🔒 **Secure API Key Management**
- Securely stores your Google Gemini API key locally
- Easy setup and configuration process
- Option to update or delete stored credentials

### 📊 **Cost-Effective**
- Uses the economical Gemini 2.0 Flash-Lite model
- Average cost: **$0.0004 per commit**
- Extremely budget-friendly even for large teams

## 🚀 Quick Start

### 1. **Install the Extension**
Install SmartCommits from the VS Code Marketplace.

### 2. **Get a Google Gemini API Key**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the generated key

### 3. **Configure the Extension**
1. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
2. Run `SmartCommits: Configure API Key`
3. Paste your API key when prompted

### 4. **Generate Your First Commit**
1. Make changes to your code
2. Stage your changes (`git add`)
3. Open Command Palette and run `SmartCommits: Suggest Commit Message`
4. Review the AI-generated suggestion and copy to clipboard

## 🎮 Commands

Access these commands via the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`):

| Command | Description |
|---------|-------------|
| `SmartCommits: Configure API Key` | Set up or update your Google Gemini API key |
| `SmartCommits: Suggest Commit Message` | Generate an AI-powered commit message for staged changes |
| `SmartCommits: Delete All Data` | Remove all stored extension data and settings |

## 📋 Requirements

- **VS Code**: Version 1.101.0 or higher
- **Git**: Repository must be initialized
- **Google Gemini API Key**: Free tier available at [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Staged Changes**: The extension only works with staged git changes

## 🔧 How It Works

1. **Change Detection**: SmartCommits reads your staged git changes using `git diff --staged`
2. **AI Analysis**: Sends the diff to Google Gemini AI with optimized prompts
3. **Smart Generation**: Receives a conventional commit message with explanation
4. **User Review**: Presents the suggestion for your approval
5. **Easy Integration**: Copy to clipboard for immediate use

## 💡 Tips for Best Results

- **Stage specific changes**: Use `git add -p` for granular staging
- **Keep commits focused**: Smaller, focused commits generate better messages
- **Review suggestions**: AI-generated messages are suggestions - review before using
- **Conventional commits**: The AI follows conventional commit standards

## 🛠️ Coming Soon

- 📦 **Optimized Git Diff Compression** - Smart compression for diffs larger than 50,000 characters
- 🎨 **Toggle Between Commit Styles** - Command to switch between conventional commits and emoji commits
- ⚡ **Direct Commit Execution** - Execute commits directly after approval instead of copying to clipboard

## 🐛 Known Issues

- Large diffs (>50,000 characters) are automatically rejected to manage API costs
- Extension requires an active internet connection for AI generation
- Non-English code comments may affect message quality

## 📝 Release Notes

### 0.0.1 (Initial Release)

- ✨ AI-powered commit message generation using Google Gemini
- 🔒 Secure API key management
- 🎯 Staged changes analysis and validation
- 📋 Copy to clipboard functionality
- 💰 Cost-effective implementation with usage tracking

---

## 💰 Cost Analysis - AI Usage Pricing

### Model Used
**Gemini 2.0 Flash-Lite** - $0.075 input / $0.30 output per 1M tokens

| Commit Type | Cost per Commit | Cost per 1,000 Commits | Commit Example |
|-------------|-----------------|-------------------------|----------------|
| **Average Commit** | **$0.0004** | **$0.40** | **Typical use cases:**<br/>• Add a new function or endpoint<br/>• Fix a specific bug<br/>• Update documentation<br/>• Add validations<br/>• Modify CSS styles<br/>• Write unit tests<br/>📊 **Characteristics:** 50-200 lines, 2-5 files, ~4,500 tokens |
| **Large Commit (Maximum)** | **$0.0029** | **$2.90** | **Typical use cases:**<br/>• Complete architecture refactoring<br/>• Migrate to new library/framework<br/>• Implement complete feature with tests<br/>• Reorganize folder structure<br/>• Update major dependencies<br/>• Change authentication system<br/>📊 **Characteristics:** 800-1,200 lines, 15-30 files, ~38,300 tokens |

### Efficiency Summary

| Metric | Value |
|--------|-------|
| **Most economical model** | ✅ Gemini 2.0 Flash-Lite |
| **Typical monthly cost** | $0.10 - $0.50 |
| **Very active developer** | $1.00 - $3.00 |
| **Extreme case (1000 large commits)** | $2.90 |

**Conclusion:** SmartCommits is extremely cost-effective, even for large teams with frequent and large commits.
