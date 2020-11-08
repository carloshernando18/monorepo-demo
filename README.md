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
* Instalar **husky**
```
npm install husky --save-dev
```
Agregamos `husky` al archivo `package.json` con la siguiente configuración.
* `per-commit:` ejecutamos el comando `nx format:write` para formatear todo el código antes de cada `commit` y luego ejecutamos `nx affected:lint` para ejecutar el `lint` solo para el código afectado y al final ejecutamos el `nx affected:test` comando para ejecutar las pruebas para el código afectado.
* `commit-msg:` ejecutamos el comando `commilint` para asegurarnos de que el mensaje del `commit` se ajuste a la configuración.
```
{
  ...
  "husky": {
    "hooks": {
      "pre-commit": "nx format:write && nx affected:lint && nx affected:test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## Tipos permitido en el `commitlint`
Los tipo permitidos son los siguiente:
* `build`: Cambios que afectan el sistema de compilación o dependencias externas.
* `ci`: Cambios en nuestros archivos de configuración y scripts de `CI`.
* `docs`: Cambios solo en la documentación.
* `feat`: Una nueva caracteristica.
* `fix`: Una correción de errores.
* `perf`: Un cambio de código que mejora el rendimiento.
* `refactor`: Un cambio de código que no corrige un error ni agrega una función.
* `style`: Cambios que no afecta el significado del código (espacios en blanco, formato, punto y coma que fallan, entre otras).
* `test`: Agregar pruebas o corregir pruebas existentes.

Ejemplos **commits**
```
git commit -m 'docs: update readme.md'
```
o
```
git commit -m 'feat(auth): add the auth.controller'
```

## Agregamos los pluging `Angular` y `Nestjs`
Para agregar `Angular` y `Nestjs`, necesitamos ejecutar los siguientes comandos:
`Angular`
```
npm install --save-dev @nrwl/angular
```
`Nest`
```
npm install --save-dev @nrwl/nest
```

### Agregamos una aplicación para `Angular` y otra para `NestJs`
Para ejecutar una aplicación `NestJs`, debemos ejecutar el siguiente comando
```
nx generate @nrwl/nest:application --name=api
```
Ahora agregamos una aplicación `Angular`
```
nx generate @nrwl/angular:application --name=app --style=scss --backendProject=api --linter=eslint --routing --strict
```

## Agregamos una bibliote de interfaz de usuario `ui`
Ahora vamos a crear una biblioteca angular para los componentes de la interfaz de usuario.
```
nx generate @nrwl/angular:library --name=ui --style=scss --directory=front --linter=eslint
```
Posteriormente creamos un componente de `Profile` dentro de `ui`
```
nx generate @schematics/angular:component --name=profile --project=front-ui --style=scss --changeDetection=OnPush --export
```
Ahora para importar el `profile.component.ts` en nuestra aplicación `app`, necesitamos importar el `FrontUiModule` en el `app.module.ts`
```
...
import { FrontUiModule } from '@nx-workspace-experiments/front/ui';

@NgModule({
  ...
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    HttpClientModule,
    FrontUiModule
  ],
  ...
})
export class AppModule {}
```
### Agregamos `Angular Material` a nuestra biblioteca
Vamos a crear una biblioteca para importar y exportar todos los componentes de `Angular Material` y compartilos en nuestras aplicaciones.
```
nx generate @nrwl/angular:library --name=material --style=scss --directory=front --linter=eslint
```
### Agregamos una biblioteca de modelos de datos `data-models`
Esta biblioteca se utiliza para compartir interfaces entre nuestras aplicaciones.
```
nx generate @nrwl/workspace:library --name=data-models
```
## Firebase
Vamos a crear una cuenta de `firebase` para usar `Cloud Firestore`, esto con el fin de guardar los datos de nuestra aplicación y posteriormente usar un `Hosting` para publicar.
Primero necesitamos instalar el `CLI`de `firebase`
```
npm i -g firebase-tools
```
Después iniciamos sesión ejecutando el siguiente comando
```
firebase login
```
Ahora agregamos los paquetes `@angular/fire` y `firebase` en nuestro monorepo.
> NOTE: Ahora necesitamos agregar la configuración de `firebase` en `enviroment.ts` and `enviroment.prod.ts` en el proyecto `app`.
```
 ...
  firebaseConfig: {
    apiKey: '<your-api-key>',
    authDomain: '*****',
    databaseURL: '*****',
    projectId: '*****',
    storageBucket: '*****',
    messagingSenderId: '*****',
    appId: '*****',
    measurementId: '*****',
  }
 ...
```
Para mas información ve a la configuración de la consola de firebase.