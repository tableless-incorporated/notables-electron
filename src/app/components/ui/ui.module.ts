import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { MatIconModule, MatCardModule, MatListModule, MatButtonModule, MatSlideToggleModule,
  MatTreeModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatChipsModule,
  MatAutocompleteModule, MatDialogModule, } from '@angular/material';
import { NoteTitleCardComponent } from './note-title-card/note-title-card.component';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { NoteCreateButtonComponent } from './note-create-button/note-create-button.component';
import { NoteDeleteButtonComponent } from './note-delete-button/note-delete-button.component';
import { NoteViewEditToggleComponent } from './note-view-edit-toggle/note-view-edit-toggle.component';
import { TreeTagsComponent } from './tree-tags/tree-tags.component';
import { NoteSearchInputComponent } from './note-search-input/note-search-input.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [IconComponent, NoteTitleCardComponent, ListNotesComponent, NoteCreateButtonComponent,
    NoteDeleteButtonComponent, NoteViewEditToggleComponent, TreeTagsComponent,
    NoteSearchInputComponent, SearchInputComponent, ConfirmDialogComponent ],
  exports: [IconComponent, NoteTitleCardComponent, ListNotesComponent, NoteCreateButtonComponent,
    NoteDeleteButtonComponent, NoteViewEditToggleComponent, TreeTagsComponent,
    NoteSearchInputComponent , SearchInputComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class UiModule { }
