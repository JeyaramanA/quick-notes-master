import { Component, OnInit } from '@angular/core';
import { Quicknotes } from '../models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'quick-note',
    templateUrl: 'quick-note.dialog.component.html'
})

export class QuickNoteDialogComponent implements OnInit {
    quicknote: Quicknotes = <Quicknotes>{};

    isType: boolean;

    constructor(private modal: NgbActiveModal,
        private notificationSvc: NotificationsService) { }

    ngOnInit() { }

    close(result: any) {
        this.modal.close(result);
    }

    save(quickNoteForm: NgForm) {
        if (quickNoteForm && quickNoteForm.invalid) {
            return;
        }

        this.close(this.quicknote);
        let confirmMessage: string;
        if (this.isType) {
            confirmMessage = 'Successfully updated';
        } else {
            confirmMessage = 'Successfully saved';
        }
        this.notificationSvc.success('Success!', confirmMessage);
    }
}