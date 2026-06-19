import { Component, OnInit } from '@angular/core';

interface Entry {
  sport: string;
  distance: string;
  time: string;
  result: string;
  resultAk: string;
  link: string;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  entries: Entry[] = [];
  model: Entry = { sport: '', distance: '', time: '', result: '', resultAk: '', link: '' };

  ngOnInit(): void {
    this.load();
  }

  addEntry(): void {
    if (!this.model.sport) return;
    this.entries.push({ ...this.model });
    this.save();
    this.model = { sport: '', distance: '', time: '', result: '', resultAk: '', link: '' };
  }

  deleteEntry(i: number): void {
    this.entries.splice(i, 1);
    this.save();
  }

  save(): void {
    localStorage.setItem('portfolioEntries', JSON.stringify(this.entries));
  }

  load(): void {
    const raw = localStorage.getItem('portfolioEntries');
    if (raw) {
      try {
        this.entries = JSON.parse(raw);
      } catch {
        this.entries = [];
      }
    }
  }

  exportJson(): void {
    const dataStr = JSON.stringify(this.entries, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-entries.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}