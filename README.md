# Ejemplo Utilizando Monorepo

## Creamos el workspace (Espacio de trabajo)

Para crear el workspace  nx necesitamos ejecutar el siguiente comando

```
npx create-nx-workspace@latest
```

Después de ejecutar el comando anterior, debemos configurar los siguientes parámetros

* Definir el nombre de nuestro workspace para nuestro ejemplo: **monorepo-demo**.
```
? Workspace name (e.g., org name)       : monorepo-demo
```
* Especificar el cómo deseamos crear nuestro workspace para el ejemplo: **empty** (vacío).
```
? What to create in the new workspace   : empty
```
* Escoger la interfaz de línea de comandos o interfaz de línea de órdenes (command line interface **CLI**) que se va a utilizr para el ejemplo: **Nx**
```
? CLI to power the Nx Workspace         : Nx
```
* Nos pregunta que si vamos a utilizar **nx Cloud** para el ejemplo: **No**
```
? Use Nx Cloud?                         : No
```

## Ahora configuramos: commitlint, conventionalCommits y husky

**commitlint** Comprueba si sus comentarios de confirmación del **commit** cumplen con el formato. [commitlint](https://github.com/conventional-changelog/commitlint)

**conventionalCommits** Se trata de una especificación para dar significado a los mensajes de los commits haciéndolos legibles para humanos y máquinas. [conventional commits](https://www.conventionalcommits.org/en/)
* Instalar **commitlint** **conventionalCommits**
```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```
* Se crea un archivo en la raíz denominado `commitlint.config.js`. En dicho archivo se dfinen las reglas para commitlint.
```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 200],
    'subject-min-length': [2, 'always', 10],
    'body-min-length': [2, 'always', 10],
    'scope-enum': [2, 'always', ['auth', 'config']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
      ],
    ],
  },
};
```
