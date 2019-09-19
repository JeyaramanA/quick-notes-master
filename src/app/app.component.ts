import { Component, Inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { QuickNoteDialogComponent } from './dialogs/quick-note.dialog.component';
import { Quicknotes } from './models';
import { ConfirmationDialogService } from './dialogs/confirm.dialog.service';
import { NotificationsService } from 'angular2-notifications';
import { NoteService } from './services';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'quick-notes';
	quickNotes: Quicknotes[] = [];
	quickNotesFilters: Quicknotes[] = [];

	serchText: string;
	options = {
		position: ["bottom", "right"],
		lastOnBottom: true,
		animate: 'fromRight',
		timeOut: 5000,
		showProgressBar: true,
		pauseOnHover: true,
		clickToClose: false
	};

	constructor(private modal: NgbModal,
		private dialogSvc: ConfirmationDialogService,
		private notificationSvc: NotificationsService,
		private noteSvc: NoteService,
		@Inject(LOCAL_STORAGE) private storage: StorageService) {
			this.getStorage();
	}

	add() {
		this.openQuikeNotePopUp(<Quicknotes>{}, false, null);
	}

	edit(quicknote: Quicknotes, index: number) {
		this.openQuikeNotePopUp(quicknote, true, index);
	}

	delete(index: number) {
		this.dialogSvc.confirm('Please confirm!', 'Are you sure, You would like to delete this Quick Note?').then(s => {
			if (s) {
				this.quickNotesFilters = this.quickNotes.splice(index, 1);
				// this.quickNotesFilters.splice(index, 1);
				this.notificationSvc.success('Success!', 'Successfully deleted');
			}
		})
	}

	openQuikeNotePopUp(quicknote: Quicknotes, type: boolean, index: number) {
		const ref = this.modal.open(QuickNoteDialogComponent, {
			backdrop: 'static',
			keyboard: true
		})

		let dialog = ref.componentInstance as QuickNoteDialogComponent;
		dialog.quicknote = Object.assign({}, quicknote);
		dialog.isType = type;
		ref.result.then(s => {
			if (s) {
				if (!type) {
					this.quickNotesFilters = Object.assign([], this.quickNotes.push(s));
					this.noteSvc.storeOnLocalStorage(s);
				} else {
					this.quickNotes[index] = s;
					this.quickNotesFilters[index] = s;
					var data = window.localStorage.getItem('local_todolist');
					if (data != null) {
						let cart = JSON.parse(data);
						cart[index] = s;
						this.noteSvc.storeOnLocalStorage(cart[index]);
						let items = this.storage.get('local_todolist');
						items.splice(index, 1);
						items = JSON.stringify(items);
						localStorage.setItem("local_todolist", items);
					}
				}
			} else {

			}
		})
	}

	searchQuickNote() {
		let exp = RegExp(this.serchText, 'i');
		if (this.serchText && this.serchText !== '') {
			this.quickNotes = this.quickNotesFilters.filter(qc => qc.title.match(exp));
		} else {
			this.quickNotes = this.quickNotesFilters;
		}
	}

	refresh() {
		window.location.reload();
	}

	getStorage() {
		let STORAGE_KEY = 'local_todolist';
		this.quickNotesFilters = this.quickNotes = this.storage.get(STORAGE_KEY) ? this.storage.get(STORAGE_KEY) : [];
	}

	clearStorage() {
		this.quickNotes = [];
		this.quickNotesFilters = [];
		this.storage.clear();
	}
}
