import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarModule } from "../shared/navbar/navbar.module";
import { AuthGuard } from '../auth/guards/auth.guard';
import { FilterComponent } from './components/filter/filter.component';

const routes = [
  {
    path:'search',
    component:SearchComponent,
    // canActivate: [AuthGuard]
  },
  {path:'movie/:id',
  component:DetailsComponent,
  // canActivate: [AuthGuard]
},
{
  path: 'filter',
  component: FilterComponent
}
]

@NgModule({
    declarations: [
        SearchComponent,
        DetailsComponent,
        FilterComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NavbarModule
    ]
})
export class MoviesModule { }
