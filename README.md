# Project Idea Generator (P.I.G)

A **Next.js + TypeScript** application for generating project ideas for your next great project powered by **GEMINI**.

## Overview

This project leverages modern web technologies and AI capabilities to simplify the process of generating feature-rich descriptions tailored for specific categories, technologies, target audiences, and complexity levels. Users provide inputs, which are processed by the **Gemini AI model**, and receive structured outputs displayed in an intuitive grid format.

## Features

-   Interactive user input interface.
-   Predefined **filters** to guide users.
-   Dynamic complexity level selection.
-   Integration with the Gemini AI model for tailored content generation.
-   Clean and modern UI built with **TypeScript** and **Next.js**.

## Technologies Used

-   **Next.js**: Frontend framework for server-rendered React applications.
-   **TypeScript**: For type-safe and maintainable development.
-   **Tailwind CSS**: For efficient and responsive UI styling.
-   **Gemini AI Model**: Processes user inputs and generates structured outputs.

## Installation and Setup

1. Clone this repository:

    ```bash
    	git clone https://github.com/Anshumankhanna/project-ideas.git
    ```

2. Navigate to the project directory:

    ```bash
    	cd project-ideas
    ```

3. Install dependencies:

    ```bash
    	npm install
    ```

4. Create an `.env.local` file in the root directory of your project.

5. Paste your GEMINI API KEY as:

    ```shell
    	# Paste your api key here
    	API_KEY=your-api-key
    ```

6. Run the development server:
    ```bash
    	npm run dev
    ```
    Access the application at `http://localhost:3000`.

7. Try generating a project idea, if you recieve an output, you can now begin making changes, otherwise check the steps, you have missed something.

## Filters

### Categories

Predefined categories with associated technologies:

```json
{
    "Web Development": [
        "React",
        "Vue.js",
        "Angular",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Tailwind CSS"
    ],
    "Mobile App Development": [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Ionic",
        "Xamarin"
    ],
    "AI/ML": [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "OpenAI API",
        "Hugging Face"
    ],
    "Blockchain": [
        "Solidity",
        "Web3.js",
        "Ethereum",
        "Hardhat",
        "IPFS",
        "Smart Contracts"
    ],
    "DevOps": [
        "Docker",
        "Kubernetes",
        "Jenkins",
        "AWS",
        "Terraform",
        "GitHub Actions"
    ]
}
```

### Target Audiences

-   Developers
-   Students
-   Businesses
-   Hobbyists
-   Startups

### Complexity Levels

-   Easy
-   Intermediate
-   Advanced
-   Expert

## Workflow

1. **Input Data**:  
   Users select:

    - Category
    - Technologies
    - Target Audience
    - Complexity Level

2. **AI Processing**:  
   Inputs are sent to the **Gemini AI Model** for generating content.

3. **Output Display**:  
   Results are presented as:
    - A grid containing descriptions.
    - A nested grid showcasing categorized features.

## License

The project is originally developed by [notcodesid](https://github.com/notcodesid)

This fork is created, developed & maintained by [Anshumankhanna](https://github.com/Anshumankhanna)

It is an open-source project and contributors are welcomed.

## Acknowledgements

-   **Next.js** for the seamless development experience.
-   **Tailwind CSS** for efficient UI design.
-   **Gemini AI Model** for advanced content generation.

---

Feel free to modify or enhance the template based on your specific requirements.
