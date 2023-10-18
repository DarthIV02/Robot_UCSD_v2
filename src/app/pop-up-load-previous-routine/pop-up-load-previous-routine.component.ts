import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopoverController  } from '@ionic/angular';
import { RestService } from '../rest.service';
import { NewBlockService } from '../new-block.service';
import { Routines } from '../models/routines.model';
import { BlockComponentComponent } from '../block-component/block-component.component';


@Component({
  selector: 'app-pop-up-load-previous-routine',
  templateUrl: './pop-up-load-previous-routine.component.html',
  styleUrls: ['./pop-up-load-previous-routine.component.scss'],
})
export class PopUpLoadPreviousRoutineComponent implements OnInit {

  constructor(private popoverController : PopoverController, private new_block: NewBlockService) { }

  componentRef;

  ngOnInit() {}

  buttonPressed(str?: string) {
    if(str == "yes"){
      this.popoverController.dismiss("yes");
    }else{
      this.popoverController.dismiss();
    }
  }
}

