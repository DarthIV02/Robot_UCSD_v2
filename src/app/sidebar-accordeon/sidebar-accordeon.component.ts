import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { IonAccordionGroup, IonicModule } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ScrollService } from '../scroll.service';
import { RestService } from '../rest.service';
import { Body_Gestures, Facial_Expression, Speech, Tone_Voice, Routines_Blocks, Block } from '../models/blocks.model';
import { NewBlockService } from '../new-block.service'
import { PopUpService } from '../pop-up.service';

@Component({
  selector: 'app-sidebar-accordeon',
  templateUrl: './sidebar-accordeon.component.html',
  styleUrls: ['./sidebar-accordeon.component.scss'],
})
export class SidebarAccordeonComponent implements OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('listenerbig', { static: false }) listenerBig: IonAccordionGroup;
  @ViewChild('listenersmall', { static: false }) listenerSmall: IonAccordionGroup;
  private scrollSubscription: Subscription;
  talk: Speech;
  
  //Esta parte es para hacer que funcione el scroll en dos componentes 
  constructor(private scrollService: ScrollService, private rs: RestService, private new_block: NewBlockService, private pop_up: PopUpService) {

    this.scrollSubscription = this.scrollService.getScrollObservable().subscribe(({positionX, positionY }) => 
    {
      this.content.scrollToPoint(positionX, positionY, 500); // Realizar el scroll en este componente
    });

    this.talk = new Speech("", "Talk", "Talk block", "A1", "");

  }

  ngOnDestroy() {
      this.scrollSubscription.unsubscribe(); // Importante desuscribirse al destruir el componente
  }

 
  facial_expresions: Facial_Expression[] = [];
  body_gestures: Body_Gestures[] = [];
  tone_of_voice: Tone_Voice[] = [];
  speech: Speech[] = [];
  routines: Routines_Blocks[] = [];

  facial_expresions_blocks: Facial_Expression[] = [];
  body_gestures_blocks: Body_Gestures[] = [];
  tone_of_voice_blocks: Tone_Voice[] = [];
  speech_blocks: Speech[] = [];
  routines_blocks: Routines_Blocks[] = [];

  colors: string[] = ["light-constrast", "danger", "light", "light", "light", "light"];

  ngOnInit() {

    this.rs.read_db()
    .subscribe(
      (response) => {

        this.facial_expresions = response[0];

        this.facial_expresions.forEach(element => {
          const block = new Facial_Expression(element.id, element.label, element.description, element.id_in_robot, element.level);
          block.color = "success";
          this.facial_expresions_blocks.push(block);
        });

        this.body_gestures = response[1];

        this.body_gestures.forEach(element => {
          const block = new Body_Gestures(element.id, element.label, element.description, element.id_in_robot, element.level);
          block.color = "danger";
          this.body_gestures_blocks.push(block);
        });

        this.tone_of_voice = response[2];

        this.tone_of_voice.forEach(element => {
          const block = new Tone_Voice(element.id, element.label, element.description, element.id_in_robot);
          block.color = "tertiary";
          this.tone_of_voice_blocks.push(block);
        });
        
        this.speech = response[3];

        this.speech.forEach(element => {
          const block = new Speech(element.id, element.label, element.description, element.id_in_robot, element.utterance);
          block.color = "warning";
          if(element.label != "Talk"){
            console.log(element.label);
            this.speech_blocks.push(block);
          } else {
            this.talk = block;
          }
        });

        this.routines = response[4];
        this.routines.forEach(element => {
          const block = new Routines_Blocks(element.id, element.label, element.description);
          block.color = "medium";
          this.routines_blocks.push(block);
        });

      },
      (error) => {
        console.log("No Data Found" + error);
      }
    )

    this.generateItems();

  }

  private generateItems() {

  }

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

  onDragEnd(event: DragEvent, block: Block): void {
    this.new_block.emitData(event, block);
  }

  accordionGroupChange(ev: any, accordionGroup: String){
    const selectedValue = ev.detail.value;
    if(accordionGroup == "NonVerbal"){
      console.log("NonVerbal");
      if(selectedValue.indexOf("NonVerbal") !== -1){
        this.colors[0] = "primary";
      } else {
        this.colors[0] = "light";
      }
      if(selectedValue.indexOf("Verbal") !== -1){
        this.colors[3] = "primary";
      } else {
        this.colors[3] = "light";
      }
      if(selectedValue.indexOf("Actions") !== -1){
        this.colors[5] = "primary";
      } else {
        this.colors[5] = "light";
      }
    } else if(accordionGroup == "listener_non_verbal"){
      console.log(accordionGroup);
    }
  };

  isExpanded = false;

  onAccordionChange(event: any) {
    // Toggle the isExpanded variable when the accordion is toggled
    this.isExpanded = !this.isExpanded;
  }

  openLastRoutine(){
    console.log("Open Last Routine")
  }

}
