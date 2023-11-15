import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarAccordeonComponent } from '../sidebar-accordeon/sidebar-accordeon.component';

@NgModule({
  declarations: [SidebarAccordeonComponent],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ],
  exports: [
    SidebarAccordeonComponent,
  ],
  providers: [RestService]
})
export class SidebarModule { 
  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  // Aqui inica las funciones para hacer el Scroll
  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    console.log('scroll', ev.detail);
  }

  handleScrollEnd() {
    console.log('scroll end');
  }
}
