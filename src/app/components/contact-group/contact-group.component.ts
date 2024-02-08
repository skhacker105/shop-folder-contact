import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DynamicLayoutComponent } from 'shop-folder-component';
import { DBService, GridService, IContactGroup, ISortBy, UserService, anyFilters } from 'shop-folder-core';
import { AgGridModule } from 'ag-grid-angular';
import { DEFAULT_GROUP_COLUMNS } from '../../view-columns';

@Component({
  selector: 'app-contact-group',
  standalone: true,
  imports: [CommonModule, RouterLink, DynamicLayoutComponent, AgGridModule],
  templateUrl: './contact-group.component.html',
  styleUrl: './contact-group.component.scss'
})
export class ContactGroupComponent extends GridService<IContactGroup> implements OnInit {

  private defaultSort: ISortBy = {
    column: 'name',
    order: 'asc'
  }

  constructor(
    public route: ActivatedRoute,
    private dbService: DBService,
    public userService: UserService
  ) {
    super({
      allViews: [DEFAULT_GROUP_COLUMNS],
      route,
      table: dbService.currentDB.contactGroups
    });
    this.setPageSize(50000);
    this.setSortBy(this.defaultSort);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.grid.suppressHorizontalScroll = true;
    this.createPageFilters();
    this.mapParamsToFilter();
  }

  handleFilterOptions(updatedFilters: anyFilters[]) {
    super.handleFilterUpdate(this.convertFiltersToFunctions(updatedFilters));
    this.pageFilters = updatedFilters;
  }

  override createPageFilters(): void {
    // throw new Error('Method not implemented.');
  }
  override handleSelectModeOn(): void {
    // throw new Error('Method not implemented.');
  }
  override handleSelectModeOff(): void {
    // throw new Error('Method not implemented.');
  }

}
