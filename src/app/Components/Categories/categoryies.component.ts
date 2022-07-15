import { Component, EventEmitter, OnInit } from '@angular/core';
import { Category } from '../../Models/category';
import { CategoriesService } from '../../Services/category.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { style } from '@angular/animations';
@Component({
  selector: 'app-categories',
  templateUrl: './categoryies.component.html',
  styleUrls: ['./categoryies.component.scss']
})
export class CategoriesComponent implements OnInit {
  // Used to add new catService
  category : Category = new Category()
  submitted = false
  // Retrieve Cats
  categories?: Category[]
  currentCat?: Category;
  // Update
  currentCategoryUpdate : Category = {
    Name : '',
    Description : '',
  } 
  toDisplay = false;
  gotId: string =''
  selectedCatID:number=0;
  constructor(private catService:CategoriesService, private fs:AngularFirestore) {
    
  }
  ngOnInit(): void {
    this.retrieveCats()
  }  
  ngOnChanges(): void {
  }
  sendId(id:any){
    this.gotId = id
    console.log(id)
    this.toDisplay = !this.toDisplay;
  }
  updateTutorial(id:any) : void {
    this.toDisplay = !this.toDisplay;
    
    const data = {
      Name: this.currentCategoryUpdate.Name,
      Description: this.currentCategoryUpdate.Description
    };
    if (id) {
      this.catService.update( data,id)
        .then(() => console.log('done'))
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(id:any): void {
    if (id) {
      this.catService.delete(id)
        .then(() => {
        })
        .catch(err => console.log(err));
    }
  }
/////////////////////////////////////////////////////////////////////////////////
  retrieveCats():void{
    this.catService.getAllCat().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id : c.payload.doc.id, ...c.payload.doc.data()
        }))
      )
    )
    .subscribe(data => {
      this.categories = data as Category[]
    })
  }
  setActiveCategory(category: Category, index: number): void {
    this.currentCat = category;
  }
/////////////////////////////////////////////////////////////////////////////////
  saveCat(){ // Damn Working dumb
    this.catService.create(this.category).then(()=>{
      this.submitted = true
    })
  }
  newCat(){ // Damn Working dumb
    this.submitted = false
    this.category = new Category()
  }
/////////////////////////////////////////////////////////////////////////////////


}
