# Mesh Midnight

Midnight is a next-generation blockchain that protects user, business, and transaction data. Its zero-knowledge (ZK) proofs ensure privacy without compromising data protection or ownership.

Mesh Midnight provides tools, documentations, and education materials to remove the barriers preventing organizations and service providers from leveraging Midnight technology.

Docs: [meshjs - midnight](https://midnight.meshjs.dev/)

## Development

This repository is a monorepo using [Turborepo](https://turbo.build/).

### Initial Setup

1.  **Install dependencies from the root of the project:**

    ```bash
    npm install
    ```

2.  **Install Turbo globally (optional but recommended):**

    ```bash
    npm install -g turbo
    ```

### Running Applications

You can run each application using the `turbo run dev` command with a filter for the specific application.

-   **Docs Website**

    To run the documentation website (`apps/docs`) in development mode:

    ```bash
    turbo run dev --filter=@meshsdk/midnight-docs
    ```

    The website will be available at [http://localhost:3000](http://localhost:3000).

-   **Playground**

    To run the playground application (`apps/playground/frontend`) in development mode:

    ```bash
    turbo run dev --filter=frontend
    ```

    The website will be available at [http://localhost:5173](http://localhost:5173).


### Building Packages

-   **Build all packages:**

    To build all the libraries in the `packages` directory:

    ```bash
    npm run build:mesh
    ```

-   **Build a specific package:**

    You can build a single package by using a filter. For example, to build only the `@meshsdk/midnight-core` package:

    ```bash
    turbo run build --filter=@meshsdk/midnight-core
    ```

    Here are the package names for the other libraries:
    -   `@meshsdk/midnight-react`
    -   `@meshsdk/midnight-wallet`

### Preparing Packages for Publishing

To clean, build, and pack all packages for publishing, run the following command from the root:

```bash
npm run prepack:packages
```

## Repository Structure

This repository is a monorepo that contains the following:

- **`.github`**: Contains GitHub Actions workflows for CI/CD, issue templates, and pull request templates.
- **`apps`**: Contains standalone applications.
  - **`docs`**: The documentation website for Mesh Midnight, built with Next.js.
  - **`playground`**: A playground for developers to experiment with Mesh Midnight features.
- **`examples`**: A collection of example projects demonstrating how to use Mesh Midnight.
- **`packages`**: The source code for all the packages that make up Mesh Midnight.
  - **`configs`**: Shared configurations for ESLint, Prettier, Jest, and TypeScript.
  - **`mesh-midnight-cli`**: A command-line interface for interacting with Mesh Midnight.
  - **`mesh-midnight-core`**: The core library for Mesh Midnight.
  - **`mesh-midnight-react`**: React components for building UIs with Mesh Midnight.
  - **`mesh-midnight-ui-templates`**: UI templates for common use cases.
  - **`mesh-midnight-wallet`**: A package for wallet-related functionalities.
- **`scripts`**: Contains various scripts for automating repository tasks, such as version bumping.

## Related Projects

- **[Midnight Starter Template](https://github.com/MeshJS/midnight-starter-template)**: A template for business developers to get started with Midnight. It includes integrations with wallet tools and is framework-specific.
- **[Midnight Contracts](https://github.com/MeshJS/midnight-contracts)**: A resource for smart contract developers. It contains an `examples` folder showcasing contracts with providers, a CLI, and React components.

## Contributing

### Contribution Guidelines

This repository is meant to be forked as a starting point for new developments. You can:

- Fork the repository for your own project
- Contribute - Any PR is welcome to improve the template

If contributing:

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'feat: add amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

### Code Standards

- Use TypeScript for all code
- Follow configured ESLint and Prettier
- Write tests for new features
- Document APIs and complex functions

### Commit Structure

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation
- `style`: code formatting
- `refactor`: refactoring
- `test`: tests
- `chore`: maintenance tasks

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the [meshjs team](https://github.com/MeshJS/midnight/graphs/contributors)
