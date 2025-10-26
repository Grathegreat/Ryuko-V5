# Ryuko V5 - Facebook Messenger Bot

## Overview
Ryuko V5 is a Facebook Messenger bot management system with a web interface. This project allows users to create and manage multiple Facebook bot accounts through an intuitive web dashboard.

## Project Structure
- **main.js** - Main server file with Express API endpoints
- **index.js** - Entry point that spawns main.js with process management
- **config.json** - Global configuration for the bot system
- **bots.json** - Stores bot account configurations
- **states/** - Stores Facebook appstate files (JSON format)
- **botdata/** - SQLite database storage
- **script/commands/** - Bot command modules
- **script/events/** - Bot event handlers
- **public/** - Web interface files

## Setup
The application is configured to run on port 5000 and binds to 0.0.0.0 for Replit compatibility.

### Dependencies
- Node.js 20.x
- SQLite3 (rebuilt for the platform)
- Express.js for web server
- Sequelize ORM for database
- Various bot command dependencies

## Running the Application
The server automatically starts via the workflow:
```bash
node index.js
```

This spawns the main bot system which:
1. Loads configuration files
2. Initializes the database
3. Loads command and event modules
4. Starts the Express web server on port 5000
5. Manages bot account logins and listeners

## Web Interface
Access the web interface at the root URL to:
- Create new bot accounts using Facebook appstate
- Login to existing bot accounts
- View online bots
- Configure bot settings (prefix, name, admins)
- View available commands

## Database
Uses SQLite3 with Sequelize ORM. The database file is stored at:
- `botdata/database.sqlite`

## Security Notes
- Bot appstate files contain sensitive login tokens
- States are stored in `states/` directory (gitignored)
- JWT tokens are used for web authentication
- Database and appstate files are excluded from version control

## New Features Added

### War Command
- **Command**: `!war @mention`
- **Version**: 4.0.0 (Sequential 100 Rants Edition)
- **Description**: Sends ALL 100 intense Tagalog trash talks sequentially
- **Features**:
  - **Sends ALL 100 trash talks one after another** (not just one!)
  - **1-2 second random delay** between each trash talk
  - Adult language included (PUTANGINA, GAGO, ULOL, KUPAL, PUTA, LECHE, HAYOP, etc.)
  - Real Filipino street ranter energy
  - Multiple insults per rant for maximum roasting
  - Progress counter [1/100], [2/100], etc.
  - Mentions the target user in every message
  - Opening message: "WAR MODE ACTIVATED"
  - Closing message: "WAR COMPLETE - TOTAL DESTRUCTION ACHIEVED"
- **Usage**: `!war @mention`
- **Example**: `!war @JohnDoe` - Unleashes ALL 100 trash talks sequentially with delays
- **Duration**: Approximately 2-3 minutes to complete all 100 messages
- **Warning**: 
  - Contains strong adult language - use responsibly!
  - Will flood the chat with 100+ messages
  - Use only when you want MAXIMUM ROASTING

### Anti-Join Feature
- **Command**: `!antijoin on/off`
- **Permission**: Group admins only
- **Description**: Automatically removes new members who join the group
- **Requirements**: Bot must be a group admin
- **Usage**: 
  - `!antijoin on` - Enable anti-join protection
  - `!antijoin off` - Disable anti-join protection

### Anti-Out Feature
- **Command**: `!antiout on/off`
- **Permission**: Group admins only
- **Description**: Automatically adds back members who leave the group
- **Messages**: 
  - Success: "No left 😜" - When user is added back
  - Failed: "Can't add - need approval" - When bot can't add user back
- **Usage**: 
  - `!antiout on` - Enable anti-out protection
  - `!antiout off` - Disable anti-out protection

## Recent Changes
- Added war.js command for Tagalog rants with user mentions
- Added antijoin.js command to prevent new members from joining
- Added antiout.js command to prevent members from leaving
- Updated join.js event to support anti-join feature
- Updated leave.js event to support anti-out feature
- Configured port to 5000 for Replit compatibility
- Set server to bind to 0.0.0.0
- Rebuilt sqlite3 for Node.js 20.x compatibility
- Added proper .gitignore for sensitive files
