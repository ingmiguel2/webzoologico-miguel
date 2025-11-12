import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal-service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-component',
  standalone: true, // ✅ ¡Esto es vital para standalone components!
  imports: [CommonModule, ReactiveFormsModule], // 👈 AGREGA ESTO,
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css',
})

export class AnimalComponent {
  animalList: any = [];
  animalForm: FormGroup | any;

  constructor(private animalService: AnimalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router) { 
  }
  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
    });
  }

  ngOnInit() {
    this.animalForm = this.formBuilder.group({
      nombre: '',
      edad: 0,
      tipo: ''
    });
    this.getAllAnimals();
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  newAnimalEntry(){
    this.animalService.newAnimal(this.animalForm.value).subscribe(

      () => {
        //Redirigiendo a la ruta actual /animales y recargando la ventana
        this.router.navigate(['/animales'])
        .then(() => {
          this.newMessage('Registro exitoso');
                this.animalForm.reset();
          this.getAllAnimals(); // 🔄 actualiza la lista sin recargar
        })
      }
    );
  }
}
