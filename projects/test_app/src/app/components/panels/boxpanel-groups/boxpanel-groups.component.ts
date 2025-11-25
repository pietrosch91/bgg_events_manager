import { Component } from '@angular/core';
import { EV_BOXES } from 'bgg-sql-mngr';

@Component({
  selector: 'app-boxpanel-groups',
  standalone: false,
  templateUrl: './boxpanel-groups.component.html',
  styleUrl: './boxpanel-groups.component.css',
})
export class BoxpanelGroupsComponent {

  public boxes=EV_BOXES.EV_BOXES;
}
