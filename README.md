# Engine X
  #### Redefining the Search Experience
Engine X stands as a beacon of innovation, seamlessly fusing FastAPI and WebSocket to deliver an immersive and visually enriching search experience. Engine X integrates FastAPI, BeautifulSoup, and WebSocket technologies to revolutionize the user experience. Equipped with a sophisticated search function, it dynamically queries Wikipedia, presenting results with an unparalleled visual elegance.

## Frames

* **BeautifulSoup:** A powerful Python library for parsing HTML and XML documents, enabling the application to extract relevant information from Wikipedia pages with precision.
* **WebSocket:** A cutting-edge communication protocol that ensures seamless, bidirectional data exchange between the server and the client in real-time.
* **CORS Middleware:** Facilitates secure cross-origin resource sharing, ensuring compatibility across various web browsers.
* **Jinja2Templates:** A flexible template engine for HTML rendering, enhancing the application's frontend design's adaptability and maintainability.
* **Requests:** A comprehensive Python library for making HTTP requests, facilitating communication with external APIs and services.

## X's Structure

Engine-X's robust architecture is built upon the foundation of cutting-edge technologies:

- **Frontend:** HTML, CSS, JavaScript

- **Backend:** FastAPI, Python, WebSocket, BeautifulSoup

## Seamless Setup Options

Engine X offers two convenient setup methods to cater to your preferences:

### Method 1: Manual Installation

1. Install Python and pip
2. Clone the repository: `git clone https://github.com/AnamolZ/Engine-X.git`
3. Install the required dependencies: `pip install -r requirements.txt`
4. Run the backend server: `python main.py`
5. Open the `index.html` file in your web browser to access the application

### Method 2: Docker Image

1. Pull the Docker image: `docker pull err0rz/enginex`
2. Terminal: `docker run -d -p 8000:8000 err0rz/enginex`
3. Open web browser: [http://localhost:8000/](http://localhost:8000/)

## Intuitive Usage

1. **Homepage:** An elegant search bar and a real-time Words Per Minute (WPM) indicator.
2. **Search:** The search function dynamically queries Wikipedia as users type, using the last word entered.
3. **Real-time Results:** Search results are displayed in real-time, with highlighted paragraphs presented in vibrant colors for easy readability.
4. **WPM Calculation:** The application meticulously calculates the user's typing speed (WPM) and updates the WPM indicator in real-time.

## Contributing to the Engine-X Community

We welcome contributions to the Engine-X project. Feel free to fork the repository, engage in discussions, and submit pull requests to enhance its features and functionality.

## Open-Source License

Engine-X is licensed under the MIT License, an open-source license that fosters collaboration and innovation. This license grants you the freedom to use, modify, and distribute StockSwift for any purpose, empowering you to contribute to its growth and development.
