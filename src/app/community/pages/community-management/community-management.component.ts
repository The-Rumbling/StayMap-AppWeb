import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';

import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {CommunityService} from '../../services/community.service';
import {Community} from '../../model/community.entity';
import {
  CommunityCreateAndEditComponent
} from '../../components/community-create-and-edit/community-create-and-edit.component';
import {MatButton} from '@angular/material/button';
import {UserService} from '../../../users/services/user.service';
import {User} from '../../../users/model/user.entity';

@Component({
  selector: 'app-community-management',
  imports: [
    NgForOf,
    NgStyle,
    MatButton,
    CommunityCreateAndEditComponent,
    NgIf,
  ],
  templateUrl: './community-management.component.html',
  styleUrl: './community-management.component.css'
})
export class CommunityManagementComponent implements OnInit, AfterViewInit{
  isLoggedIn:boolean = false;
  protected communityData!: Community;

  protected columnsToDisplay: string[] = ['id', 'name', 'memberQuantity', 'actions'];

  protected editMode: boolean = false;
  protected communityService: CommunityService = inject(CommunityService);
  protected dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      this.isLoggedIn=!!user;
    });
    this.editMode = false;
    this.communityData = new Community({});
    this.dataSource = new MatTableDataSource();
    console.log(this.communityData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllCommunities();
  }
  private getAllCommunities() {
    this.communityService.getAll().subscribe((response: Array<Community>) => {
      console.log(' Comunidades cargadas desde el JSON:', response);
      this.dataSource.data = response;
    });
  }
  private createCommunity() {
    if (!this.communityData.id) {
      this.communityData.id = Date.now();
    }

    this.communityService.create(this.communityData).subscribe(() => {
      this.getAllCommunities();
    });
  }

  private updateCommunity() {
    let communityToUpdate = this.communityData;
    this.communityService.update(communityToUpdate.id, communityToUpdate).subscribe((response: Community) => {
      let index = this.dataSource.data.findIndex((community: Community) => community.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }


  private deleteCommunity(id: number) {
    this.communityService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((community: Community) => community.id !== id);
    });
  }

  protected onEditItem(item: Community) {
    this.editMode = true;
    this.communityData = item;
  }

  protected onDeleteItem(item: Community) {
    this.deleteCommunity(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.formVisible = false;
  }

  private resetEditState() {
    this.communityData = new Community({});
    this.editMode = false;
  }

  protected onCommunityAddRequested(item: Community) {
    this.communityData = item;
    this.createCommunity();
    this.resetEditState();
  }

  protected onCommunityUpdateRequested(item: Community) {
    this.communityData = item;
    this.updateCommunity();
    this.formVisible = false;
  }

  protected formVisible = false;

  protected onAddCommunityClicked() {
    this.resetEditState();
    this.formVisible = true;
  }
}
