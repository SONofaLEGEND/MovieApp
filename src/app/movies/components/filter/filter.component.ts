import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MovieApiService } from 'src/app/shared/services/movie-api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
movieList: any[] = [];
  genres: string[] = ['comedy', 'action', 'adventure', 'documentary', 'scifi', 'thriller', 'animation'];
  releaseYears: number[] = Array.from({ length: new Date().getFullYear() - 1949 }, (_, index) => index + 1950);
  filtersForm = new FormGroup({
    genre: new FormControl(''),
    releaseYear: new FormControl('')
  });

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit(): void {
    this.getFilteredMovies();
  }

  getFilteredMovies() {
    const selectedGenre = this.filtersForm.value.genre;
    const selectedYear = this.filtersForm.value.releaseYear;
    
    let apiUrl = `${this.movieApiService.baseurl}/discover/movie?api_key=${this.movieApiService.apikey}`;
  
    if (selectedGenre) {
      const genreId = this.getGenreId(selectedGenre);
      if (genreId) {
        apiUrl += `&with_genres=${genreId}`;
      }
    }
  
    if (selectedYear) {
      apiUrl += `&primary_release_year=${selectedYear}`;
    }
  
    this.movieApiService.getMovies(apiUrl).subscribe((result) => {
      this.movieList = result.results;
    });
  }
  getGenreId(genre: string): number | undefined {
    const genreMap: Record<string, number> = {
      comedy: 35,
      action: 28,
      adventure: 12,
      documentary: 99,
      scifi: 878,
      thriller: 53,
      animation: 16
    };
  
    return genreMap[genre];
  }
  
}

