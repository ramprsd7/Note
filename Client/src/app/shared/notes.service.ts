import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  selectedNote: Note;
  notes: Note[];
  readonly baseURL = 'http://localhost:4000/notes';

  constructor(private http: HttpClient ) { }

  // tslint:disable-next-line: typedef
  postNote(note: Note){
    return this.http.post(this.baseURL, note);
  }


  // tslint:disable-next-line: typedef
  getNotesList() {
    return this.http.get(this.baseURL);
  }

  // tslint:disable-next-line: typedef
  putNotes(note: Note) {
    return this.http.put(this.baseURL + `/${note._id}`, note);
  }


  // tslint:disable-next-line: variable-name typedef
  deleteNotes(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
