import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Subject} from '../../models/subject';
import {Router} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {Student} from '../../models/student';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [StudentService]
})
export class DashboardComponent implements OnInit {

  subjects: Subject[];
  /**
   * To see the enrolled students
   */
  singleSubject: Subject;
  students: Student[];
  idSelectedSubject: string;
  body: object;
  subjectName: string;

  constructor(private studentService: StudentService, private router: Router,
              private subjectService: SubjectService) {
    this.singleSubject = new Subject();
  }

  ngOnInit() {
    this.getSubjects();
    this.getStudents();
  }

  deleteSubject(id: string, i: number) {
    if (confirm('Are yo sure you want to delete it?')) {
      this.subjectService.deleteSubject(id)
        .subscribe(res => {
          this.subjects.splice(i, 1);
        },
          err => {
          console.log(err);
          });
    }
  }

  deleteStudent(id: string, i: number) {
    if (confirm('Are yo sure you want to delete it?')) {
      this.studentService.deleteStudent(id)
        .subscribe(res => {
            this.students.splice(i, 1);
          },
          err => {
            console.log(err);
          });
    }
  }

  getSubjects() {
    this.subjectService.getSubjects()
      .subscribe(res => {
        console.log(res);
        this.subjects = res as Subject[];
      });
  }

  getStudents() {
    this.studentService.getStudents()
      .subscribe(res => {
        console.log(res);
        this.students = res as Student[];
      });
  }

  subjectDetail(id: string) {
    this.subjectService.getStudentSubjectDetail(id)
      .subscribe( res => {
          console.log(res);
          this.singleSubject = res as Subject;
        },
        err => {
          console.log(err);
        });
  }

  studentSubjectDetail(id: string) {
    console.log(id);
    this.subjectService.getStudentSubjectDetail(id)
      .subscribe( res => {
          console.log(res);
          this.router.navigate(['/studentsdetail', id]);
        },
        err => {
          console.log(err);
        });
  }

  assignSubjectId(id: string) {
    this.idSelectedSubject = id;
  }

  addStudentSubject(id: string) {
    this.body = {
      subjectId: this.idSelectedSubject,
      studentId: id
    };
    console.log(this.body);
    this.subjectService.postStudentSubject(this.body)
      .subscribe( res => {
          console.log(res);
          confirm('Added successfully');
        },
        err => {
          console.log(err);
        });
  }

  addNewSubject() {
    const subject = {
      name: this.subjectName
    };
    console.log(this.subjectName);
    this.subjectService.postSubject(subject)
      .subscribe( res => {
          console.log(res);
          this.getSubjects();
        },
        err => {
          console.log(err);
          confirm('Name must be unique');
        });
  }

  addNewStudent() {
    this.router.navigateByUrl('/addstudent');
  }
}
