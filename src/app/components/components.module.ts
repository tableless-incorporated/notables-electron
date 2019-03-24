import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from './ui/ui.module';
import { AllNotesMenuTitleComponent } from './all-notes-menu-title/all-notes-menu-title.component';
import { TagsListMenuTitleComponent } from './tags-list-menu-title/tags-list-menu-title.component';
import { TagSelectedIconComponent } from './tag-selected-icon/tag-selected-icon.component';
import { NoteResumeComponent } from './note-resume/note-resume.component';
import { NoteResumesComponent } from './note-resumes/note-resumes.component';
import { CustomPipesModule } from 'ngx-custom-pipes';
import { Md2txtPipe } from './md2txt.pipe';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { TreeTagsComponent } from './ui/tree-tags/tree-tags.component';
import { MiddleNavBarComponent } from './middle-nav-bar/middle-nav-bar.component';
import { SearchInputComponent } from './ui/search-input/search-input.component';

@NgModule({
  declarations: [AllNotesMenuTitleComponent, TagsListMenuTitleComponent,
    TagSelectedIconComponent, NoteResumeComponent, NoteResumesComponent,
    Md2txtPipe,
    MainNavBarComponent,
    MiddleNavBarComponent, ],
  exports: [AllNotesMenuTitleComponent, TagsListMenuTitleComponent,
    TagSelectedIconComponent, NoteResumeComponent, NoteResumesComponent,
    MainNavBarComponent, TreeTagsComponent,
    MiddleNavBarComponent, SearchInputComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    CustomPipesModule,
  ],
})
export class ComponentsModule { }
