import { Component, inject, signal } from "@angular/core";
import { StyledButtonComponent } from "../styled-button/styled-button.component";
import { HttpClient } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

type DogResponse = {
  message: string;
  status: string;
};

@Component({
  selector: "app-dog-generator",
  standalone: true,
  imports: [StyledButtonComponent, AsyncPipe],
  templateUrl: "./dog-generator.component.html",
  styleUrl: "./dog-generator.component.css",
})
export class DogGeneratorComponent {
  imageData$: Observable<DogResponse> | undefined;
  httpService = inject(HttpClient);

  onDogGenerate() {
    this.imageData$ = this.httpService.get<DogResponse>(
      "https://dog.ceo/api/breeds/image/random",
    );
  }
}
