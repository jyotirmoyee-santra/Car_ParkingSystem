
import { config } from './config';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

if (config.useJIT) {
  // JIT mode for online editors
  import('@angular/compiler').then(() => {
    import('@angular/platform-browser-dynamic').then(({ platformBrowserDynamic }) => {
      import('./app/app').then(({ App }) => {
        platformBrowserDynamic().bootstrapModule(App)
          .catch(err => console.error(err));
      });
    });
  });
} else {
  // AOT mode for local dev
  bootstrapApplication(App, appConfig)
    .catch(err => console.error(err));
}

