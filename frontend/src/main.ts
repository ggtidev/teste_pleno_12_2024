import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Importando o AppComponent standalone
import { provideRouter } from '@angular/router';  // Importando a função de roteamento
import { appRoutes } from './app/app.routes';  // Supondo que suas rotas estejam em app.routes.ts
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),  // Passando as rotas para a aplicação
    provideAnimations(), // Adicione as animações aqui
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      tapToDismiss: false,
    }),
  ]
});
