import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Community } from '../../model/community.entity';
import { CommunityService } from '../../services/community.service';
import { CommunityCreateAndEditComponent } from '../../components/community-create-and-edit/community-create-and-edit.component';

@Component({
  selector: 'app-community-management',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    MatButton,
    CommunityCreateAndEditComponent
  ],
  templateUrl: './community-management.component.html',
  styleUrl: './community-management.component.css'
})
export class CommunityManagementComponent implements OnInit, AfterViewInit {
  protected communityData!: Community;
  protected columnsToDisplay: string[] = ['id', 'name', 'memberQuantity', 'actions'];
  protected editMode: boolean = false;
  protected formVisible = false;
  protected dataSource!: MatTableDataSource<any>;

  private communityService = inject(CommunityService);

  @ViewChild(MatPaginator, { static: false }) protected paginator!: MatPaginator;
  @ViewChild(MatSort) protected sort!: MatSort;

  constructor() {
    this.editMode = false;
    this.communityData = new Community({});
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllCommunities();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllCommunities(): void {
    this.communityService.getAll().subscribe((response: Community[]) => {
      console.log('✅ Comunidades cargadas:', response);
      this.dataSource.data = response;
    });
  }

  private createCommunity(): void {
    console.warn('⚠️ No se puede crear comunidades en producción estática.');
    // Aquí normalmente llamarías this.communityService.create(...)
  }

  private updateCommunity(): void {
    console.warn('⚠️ No se puede actualizar comunidades en producción estática.');
  }

  private deleteCommunity(id: number): void {
    console.warn('⚠️ No se puede eliminar comunidades en producción estática.');
  }

  protected onEditItem(item: Community): void {
    this.editMode = true;
    this.communityData = item;
  }

  protected onDeleteItem(item: Community): void {
    this.deleteCommunity(item.id);
  }

  protected onCancelRequested(): void {
    this.resetEditState();
    this.formVisible = false;
  }

  protected onCommunityAddRequested(item: Community): void {
    this.communityData = item;
    this.createCommunity();
    this.resetEditState();
  }

  protected onCommunityUpdateRequested(item: Community): void {
    this.communityData = item;
    this.updateCommunity();
    this.formVisible = false;
  }

  protected onAddCommunityClicked(): void {
    this.resetEditState();
    this.formVisible = true;
  }

  private resetEditState(): void {
    this.communityData = new Community({});
    this.editMode = false;
  }
}
