import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../models/subject';

@Component({
  selector: 'app-productdetail',
  templateUrl: './subjectdetail.component.html',
  styleUrls: ['./subjectdetail.component.css']
})
export class SubjectdetailComponent implements OnInit {

  subjectStudentDetail: Subject;

  constructor(private activatedRouter: ActivatedRoute, private subjectService: SubjectService) {
    this.subjectStudentDetail = new Subject();
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params.id !== 'undefined') {
        this.subjectStudentDetail._id = params.id;
      } else {
        this.subjectStudentDetail._id = '';
      }
    });
    this.getStudentDetail(this.subjectStudentDetail._id);
  }

  async getStudentDetail(id: string) {
    await this.subjectService.getStudentSubjectDetail(id)
      .subscribe(res => {
        console.log(res);
        this.subjectStudentDetail = res as Subject;
      });
    console.log(this.subjectStudentDetail);
  }
}
