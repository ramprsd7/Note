import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../shared/notes.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Note } from '../shared/note.model';
import { FormsModule } from '@angular/forms';
// tslint:disable-next-line: prefer-const
let M: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  constructor(public notesService: NotesService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetForm();
    this.refereshNote();
  }

  // tslint:disable-next-line: typedef typedefno
  onSubmit(form: NgForm){
    // tslint:disable-next-line: triple-equals
    if (form.value._id == ''){
      this.notesService.selectedNote = form.value;
      this.notesService.postNote(form.value).subscribe((res) => {
        // M.toast({html: 'Note added succesfully', classes: 'rounded'});
        // this.openSnackBar();
        this.refereshNote();
        alert('Note added succesfully');
        this.resetForm();
        console.log('Inserted');
      });
    }
    else{
      this.notesService.selectedNote = form.value;
      this.notesService.putNotes(form.value).subscribe((res) => {
        this.refereshNote();
        this.resetForm();
        alert('Note updated succesfully!!!');
      });
    }

  }


  // tslint:disable-next-line: typedef
  openSnackBar(){
    this.snackbar.open('Note added succesfully', 'exit', {
      duration: 200,
    });
  }

  // tslint:disable-next-line: typedef
  refereshNote(){
    this.notesService.getNotesList().subscribe((res) => {
      this.notesService.notes = res as Note[];
    });
  }

  // tslint:disable-next-line: typedef
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.notesService.selectedNote = {
      _id: '',
      title: '',
      description: '',
    };
  }


  // tslint:disable-next-line: typedef
  onEdit(n: Note){
    // alert('Working');
    this.notesService.selectedNote = n;
  }

  // tslint:disable-next-line: typedef variable-name
  onDelete(_id: string, form: NgForm){
    // tslint:disable-next-line: triple-equals
    if (confirm('Are you sure to delete this note ?') == true) {
      this.notesService.deleteNotes(_id).subscribe((res) => {
        this.refereshNote();
        this.resetForm();
        alert('deleted note');
      });
    }
  }
}
