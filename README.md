# Checklist Application

This project is a checklist application built using **React**. It allows users to create custom checklists by providing a title and comma-separated use case names. The application supports features like editing checklists, enabling/disabling strikethrough, capitalization, and uppercase settings.

---

## Features

- **Add a Checklist**:
  - Enter a title and use case names (comma-separated) to create a new checklist.
  - Input is guarded to prevent empty submissions.

- **Manage Checklists**:
  - Edit the checklist title and use case names.
  - Delete an existing checklist with a confirmation prompt.

- **Settings**:
  - Enable or disable:
    - Strikethrough for completed items.
    - Capitalization of content.
    - Uppercasing of content.

- **Persistent Storage**:
  - The checklist and settings are stored in localStorage, ensuring they persist across page refreshes.