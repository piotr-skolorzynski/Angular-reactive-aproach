import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "course",
  templateUrl: "./search-lessons.component.html",
  styleUrls: ["./search-lessons.component.css"],
})
export class SearchLessonsComponent {
  searchResults$: Observable<Lesson[]>;

  activeLesson: Lesson;

  constructor(private coursesService: CoursesService) {}

  onSearch(searchPhrase: string) {
    this.searchResults$ = this.coursesService.searchLessons(searchPhrase);
  }

  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }

  onBackToSearch() {
    this.activeLesson = null;
  }
}
