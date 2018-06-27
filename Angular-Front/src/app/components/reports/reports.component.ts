import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createPdf() {
    const doc = new jsPDF();
    doc.text("Some text here",10,10);
    doc.save("Test.pdf");

  }
}
