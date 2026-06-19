import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Entry {
  sport: string;
  distance: string;
  time: string;
  result: string;
  resultAk: string;
  link?: string;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  entries: Entry[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Entry[]>('/assets/portfolio.json').subscribe({
      next: data => { this.entries = data || []; this.loading = false; },
      error: () => { this.entries = []; this.loading = false; }
    });
  }
}