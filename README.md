# Simple implementation of OpenAI's API

### Steps to get up and running:

1. Create an [OpenAI](https://openai.com/) account by going to https://platform.openai.com/signup/
2. Create a new API key
3. If you don't have Node.js [install it from here](https://nodejs.org/en/). Then download the code by cloning this repository

    ```
    git clone https://github.com/nozma-knows/chat-gpt-test.git
    ```
4. Add your API key

    Navigate into the project directory and make a copy of the example environment variables file
    ```
    cd chat-gpt-test
    cp .env.example .env.local
    ```
    Copy your secret API key and set it as the `OPENAI_API_KEY` in your newely created `.env.local` file
5. Install dependencies and run the app

    ```
    yarn && yarn dev
    ```
