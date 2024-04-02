import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Swimming-pool';
  activeTab = 'lessons'; // Идентификатор активной вкладки
  changeTab(tab: string) {
    this.activeTab = tab; // Обновляем активную вкладку
  }
}

