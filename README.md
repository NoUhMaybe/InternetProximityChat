# Internet Proximity Chat

Internet Proximity Chat is a browser-based chat application that creates domain-specific chatrooms. It uses a browser extension to detect the current URL and automatically connects users to the appropriate chatroom based on the domain or subdomain they are visiting.

## Features

-  **Domain-specific chatrooms** – Automatically join chatrooms based on the URL you are browsing.
-  **Browser Extension Integration** – Seamlessly switches between chatrooms as you navigate the web.
-  **User Validation** – Ensures usernames are unique and properly registered.
-  **Secure Messaging** – Verifies that messages are sent only within the appropriate domain chatrooms.

## Getting Started

### Prerequisites

- Node.js and npm (for backend and extension development)
- A modern browser (Chrome or Edge) for extension support
- MongoDB or another database (optional, for persistent chat data)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NoUhMaybe/InternetProximityChat.git
   cd InternetProximityChat
