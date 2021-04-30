import {Component, OnInit} from '@angular/core';
import {Status} from '../status';
import {Router} from '@angular/router';
import {StatusService} from '../status.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {
  statuses: Status[];
  errorMessage: string;
  responseStatus: number;
  isInsert = false;

  constructor(private statusService: StatusService, private router: Router) {
    this.statuses = [] as Status[];
  }

  ngOnInit() {
    this.statusService.getStatuses().subscribe(
      statuses => this.statuses = statuses,
      error => this.errorMessage = error as any
    );
  }

  deleteStatus(status: Status) {
    this.statusService.deleteStatus(status.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        this.statuses = this.statuses.filter(currentItem => !(currentItem.id === status.id));
      },
      error => this.errorMessage = error as any);
  }

  onNewStatus(newStatus: Status) {
    this.statuses.push(newStatus);
    this.showAddStatusComponent();
  }

  showAddStatusComponent() {
    this.isInsert = !this.isInsert;
  }

  showEditStatusComponent(updatedStatus: Status) {
    this.router.navigate(['/statuses', updatedStatus.id.toString(), 'edit']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }
}
