import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Entry {
  sport: string;
  distance: string;
  time: string;
  result: string;
  resultAk: string;
  link?: string;
  year?: number;
  pb?: boolean;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  entries: Entry[] = [];
  loading = true;

  years: number[] = [];
  selectedYear: number | 'all' = 'all';
  overallBest = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Entry[]>('/assets/portfolio.json').subscribe({
      next: data => { 
        this.entries = (data || []).filter(e => !(e as any).example);
        this.computeYears();
        this.loading = false; 
      },
      error: () => { this.entries = []; this.loading = false; }
    });
  }

  private computeYears(): void {
    const set = new Set<number>();
    for (const e of this.entries) if (e.year) set.add(e.year);
    this.years = Array.from(set).sort((a,b) => b - a);
  }

  selectYear(y: number | 'all'){
    this.selectedYear = y;
    if (y !== 'all') this.overallBest = false;
  }

  toggleOverallBest(){
    this.overallBest = !this.overallBest;
    if (this.overallBest) this.selectedYear = 'all';
  }

  get filteredEntries(): Entry[] {
    if (this.overallBest) return this.entries.filter(e => e.pb === true);
    if (this.selectedYear === 'all') return this.entries.slice().sort((a,b) => (b.year || 0) - (a.year || 0));
    return this.entries.filter(e => e.year === this.selectedYear).sort((a,b) => (b.year || 0) - (a.year || 0));
  }
}