import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  NgForOf, NgIf, NgStyle
} from '@angular/common';
import {
  CommunityService
} from '../../services/community.service';
import {
  Community
} from '../../model/community.entity';
import {
  CommunityCreateAndEditComponent
} from '../../components/community-create-and-edit/community-create-and-edit.component';
import {
  MatButton
} from '@angular/material/button';
import {
  UserService
} from '../../../users/services/user.service';

@Component({
  selector: 'app-community-management',
  standalone: true,
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
export class CommunityManagementComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  protected communityData: Community = new Community({});
  protected dataSource = new MatTableDataSource<Community>();
  protected columnsToDisplay: string[] = ['id', 'name', 'memberQuantity', 'actions'];
  protected editMode = false;
  protected formVisible = false;

  protected communityService = inject(CommunityService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnInit(): void {
    this.getAllCommunities();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllCommunities(): void {
    this.communityService.getAll().subscribe({
      next: (response: Community[]) => {
        console.log('✅ Comunidades cargadas:', response);
        this.dataSource.data = response;
      },
      error: error => {
        console.error('❌ Error cargando comunidades:', error);
      }
    });
  }

  private createCommunity(): void {
    this.communityData.id = Date.now(); // Crear ID si no tiene
    this.dataSource.data.push(this.communityData);
    this.dataSource.data = [...this.dataSource.data];
  }

  private updateCommunity(): void {
    const index = this.dataSource.data.findIndex(c => c.id === this.communityData.id);
    if (index !== -1) {
      this.dataSource.data[index] = this.communityData;
      this.dataSource.data = [...this.dataSource.data];
    }
  }

  private deleteCommunity(id: number): void {
    this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
  }

  protected onEditItem(item: Community): void {
    this.editMode = true;
    this.communityData = { ...item }; // Para evitar editar en tiempo real
    this.formVisible = true;
  }

  protected onDeleteItem(item: Community): void {
    this.deleteCommunity(item.id);
  }

  protected onCancelRequested(): void {
    this.resetEditState();
    this.formVisible = false;
  }

  private resetEditState(): void {
    this.communityData = new Community({});
    this.editMode = false;
  }

  protected onCommunityAddRequested(item: Community): void {
    this.communityData = item;
    this.createCommunity();
    this.resetEditState();
    this.formVisible = false;
  }

  protected onCommunityUpdateRequested(item: Community): void {
    this.communityData = item;
    this.updateCommunity();
    this.resetEditState();
    this.formVisible = false;
  }

  protected onAddCommunityClicked(): void {
    this.resetEditState();
    this.formVisible = true;
  }
}
