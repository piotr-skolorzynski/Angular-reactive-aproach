import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { MessagesService } from "../messages/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  providers: [MessagesService],
})
export class CourseDialogComponent {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private messagesService: MessagesService,
    private coursesStore: CoursesStore
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  save() {
    //ten przykład optymistycznie zakłada, że dane zapiszą się z sukcesem
    //więc nie czekamy na odpowiedź serwera tylko wyświetlamy użytkownikowi
    //dane już zmienione na FE
    //ewentualny błąd serwera będzie ohandlowany z wnętrza store'a
    const changes = this.form.value;

    this.coursesStore.saveCourse(this.course.id, changes).subscribe();

    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }
}
