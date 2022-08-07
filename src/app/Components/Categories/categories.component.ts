import { Component, EventEmitter, OnInit } from '@angular/core';
import { Category } from '../../Models/category';
import { CategoriesService } from '../../Services/category.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  // Used to add new catService
  // category : Category = new Category()
  category : Category = {} as Category;
  submitted = false
  // Retrieve Cats
  categories: Category[]=[] as Category[];
  currentCat?: Category;
  // Update
  currentCategoryUpdate : Category = {
    id: '',
    name : '',
    img:'',
    discount : 0,
    subcollections:[]
  } 
  toDisplay = false;
  gotId: string =''
  selectedCatID:number=0;
  constructor(  private catService:CategoriesService
              , private fs:AngularFirestore
              , private router :Router
              ) {
  }
  ngOnInit(): void {
    this.retrieveCats()
  }  
  ngOnChanges(): void {
  }

  toOwnProducts(catId:string, subCats:string[])
  {
    console.log(catId, subCats)
    this.router.navigate(['/Products',{state: JSON.stringify(subCats)}])
  }

  sendId(id:any){
    this.gotId = id
    console.log(id)
    this.toDisplay = !this.toDisplay;
  }
  updateTutorial(id:any) : void {
    this.toDisplay = !this.toDisplay;
    
    const data = {
      name: this.currentCategoryUpdate.name,
      discount: this.currentCategoryUpdate.discount
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
      map(changes =>{
        console.log(changes)
        return changes.map(c =>({
            ...c.payload.doc.data(),
            id : c.payload.doc.id,
            name: c.payload.doc.id,
      })
        )}
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
    // this.category = new Category()
    this.category = {} as Category;
  }
/////////////////////////////////////////////////////////////////////////////////


}
