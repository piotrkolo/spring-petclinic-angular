import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Status} from '../status';
import {StatusService} from '../status.service';

@Component({
  selector: 'app-status-add',
  templateUrl: './status-add.component.html',
  styleUrls: ['./status-add.component.css']
})
export class StatusAddComponent implements OnInit {
  status: Status;
  errorMessage: string;
  @Output() newStatus = new EventEmitter<Status>();

  constructor(private statusService: StatusService) {
    this.status = {} as Status;
  }

  ngOnInit() {
  }

  onSubmit(status: Status) {
    status.id = null;
    this.statusService.addStatus(status).subscribe(
      newStatus => {
        this.status = newStatus;
        this.newStatus.emit(this.status);
      },
      error => this.errorMessage = error as any
    );
  }

}
