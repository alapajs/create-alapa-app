## Introduction

`create-alapa-app` is a command-line tool that scaffolds a new Alapa application. By running this command, you can quickly set up a new project directory with the necessary files and configurations. The tool also allows you to manage the installation of dependencies and customize the setup process using various options.

## Installation

You can use this tool directly without installation using `npx`. Run the following command in your terminal:

```bash
npx create-alapa-app [project-name] [options]
```

Replace [project-name] with your desired application name, such as my-alapa-app.

## Options

### -f, --force:

Force the creation of the project, even if it already exists.<br/>
Type: boolean <br/>
Default: false <br/>

#### Example:

```bash
npx create-alapa-app my-alapa-app --force
```

### -i, --install:

Automatically install dependencies after creating the project.<br/>
Type: boolean <br/>
Default: `true` <br/>

#### Examples:

```bash
npx create-alapa-app my-alapa-app --install false
```

OR

```bash
npx create-alapa-app my-alapa-app --no-install
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
