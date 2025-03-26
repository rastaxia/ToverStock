import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { VerwerkingService } from '../services/verwerking.service';
import { firstValueFrom, from, lastValueFrom } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  counts: any = [];
  mutations: any = [];

  constructor(
    private authService: AuthService,
    private verwerkingService: VerwerkingService
  ) {}

  ngOnInit() {}

  signOut() {
    this.authService.signOut();
  }

  async getData() {
    await this.getAllCounts();
    await this.getMutations();
    console.log('counts:', this.mutations);
  }

  async getAllCounts() {
    let page = 1;
    let countData: any = await lastValueFrom(
      await this.verwerkingService.getCounts(page)
    );
    this.counts = [...countData.results];
    while (countData.next && countData.results.length > 0) {
      page++;
      try {
        countData = await lastValueFrom(
          await this.verwerkingService.getCounts(page)
        );
        if (countData.results.length > 0) {
          this.counts = [...this.counts, ...countData.results];
        }
      } catch (error) {
        console.error('Fout bij ophalen van pagina', page, error);
        break;
      }
    }
  }

  async getMutations() {
    let page = 1;
    let mutationData: any = await lastValueFrom(
      await this.verwerkingService.getMutations(page)
    );
    this.mutations = [...mutationData.results];
    while (mutationData.next && mutationData.results.length > 0) {
      page++;
      try {
        mutationData = await lastValueFrom(
          await this.verwerkingService.getCounts(page)
        );
        if (mutationData.results.length > 0) {
          this.mutations = [...this.mutations, ...mutationData.results];
        }
      } catch (error) {
        console.error('Fout bij ophalen van pagina', page, error);
        break;
      }
    }
  }
}
