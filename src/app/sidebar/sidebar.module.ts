import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SidebarFirstComponent } from '../sidebar-first/sidebar-first.component';
import { SidebarSecondComponent } from '../sidebar-second/sidebar-second.component';

import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { SidebarAccordeonComponent } from '../sidebar-accordeon/sidebar-accordeon.component';

@NgModule({
  declarations: [SidebarFirstComponent, SidebarSecondComponent, SidebarAccordeonComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    SidebarFirstComponent,
    SidebarSecondComponent,
    SidebarAccordeonComponent,
  ],
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
