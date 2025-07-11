# Product Requirements Document (PRD)

Product Name: Studydock Notes App
Prepared by: Edward
Date: July 10, 2025

1. Overview
Purpose:
Studydock: This is a productivity-focused notes app designed to help users organize their thoughts, ideas, and important information in a structured, intuitive way. It allows users to create notes within folders (directories), offering a clean, responsive interface across mobile and desktop platforms.

Target Users:

Students

Professionals

Writers/Researchers

Anyone needing organized note-taking

Platforms:

Web (responsive for mobile and desktop)

PWA (Progressive Web App) support

2 Core Features
2.1 Note Creation
Users can create individual notes inside folders

Default note is auto-created when app is opened (on desktop)

Notes have titles, body content, and support rich-text formatting

2.2 Folder System
Users can create, rename, and delete folders

Notes are stored within folders

System default folder: “Notes” (pre-created on first load)

2.3 Search
A universal search bar at the top

Searches across both folders and notes (by title and body content)

2.4 Recently Deleted
Deleted notes and folders are moved to a "Recently Deleted" section

Notes/folders can be restored or permanently deleted

2.5 Formatting Tools
Toolbar includes:

Bold, Italic, Underline

Strikethrough

Font Size (in pts)

Bullet & Numbered Lists

Undo/Redo

Text alignment (left, center, right)

Code block / Quote

3 User Interface (UI)
3.1 Mobile Layout
Homepage
Top: Search bar (searches folders + notes)

Below:

“All Notes” section

List of Folders (folder name + note count)

Recently Deleted

Bottom Action Hub:

“+ Folder” icon

“+ Note” icon

Tapping “+ Note” opens note editor interface

Note Editor
Clean fullscreen typing interface

Formatting toolbar appears on top when typing

Back button to return to folder list or homepage

3.2 Desktop Layout
3-Pane Interface
Left Section: Folders

Vertical list of folders

“All Notes”, user folders, “Recently Deleted”

Search bar above the folder list

Middle Section: Notes List

Shows notes inside the selected folder

Displays:

Note Title

Preview snippet

Created date

“+ New Note” button at top or floating action icon

Automatically selects and opens the latest or default note

Right Section: Note Editor + Formatting

Rich text editing area

Formatting toolbar at top (or floating)

Real-time saving indicator (e.g., "Saving...", "Saved")

Ability to rename note from the top

4 User Flow
4.1 First-Time User Flow
User opens app

Automatically sees default folder “Notes”

One note is auto-created

User can begin typing instantly or:

Add a new note

Add a new folder

Search

5 Functional Requirements
5.1 Notes
R1: User can create, edit, delete, and move notes

R2: Notes auto-save every few seconds or on change

R3: Users can title notes and apply formatting

5.2 Folders
R4: Users can create unlimited folders

R5: Notes can be moved between folders

R6: System-created “Notes” folder is undeletable

5.3 Search
R7: Search bar returns matching folders and note titles

R8: Real-time search suggestions as user types

5.4 Deleted Items
R9: Items deleted go to “Recently Deleted”

R10: Items can be permanently deleted or restored within 7 days

5.5 Formatting
R11: Toolbar is available on both platforms

R12: Formatting is preserved between sessions

6 Non-Functional Requirements
Performance: Should load within 2 seconds on average internet

Accessibility: Follows accessibility standards (contrast, font size scaling)

Offline Mode: Support for offline note creation/editing (optional PWA functionality)

Security: Notes stored securely, optionally encrypted locally

Responsiveness: Fully responsive across all screen sizes

7 Future Features (Not MVP)
Tagging system

AI-powered note suggestions

Share notes via links

Voice note input

Collaboration support (real-time editing with others)

8 Success Metrics
95%+ crash-free sessions

Users create 3+ notes within first session

80% of users return within 7 days

Under 500ms latency for opening folders or notes
