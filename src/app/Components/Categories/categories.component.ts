import { Component, EventEmitter, OnInit } from '@angular/core';
import { Category } from '../../Models/category';
import { CategoriesService } from '../../Services/category.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  userFormGroup : FormGroup;
  Attributes : FormGroup;
  uploadUpdateImg : FormGroup;

  category : Category = new Category()
  submitted = false

  // Retrieve Cats
  categories?: Category[]

  // Display and Hide
  toDisplay = false;
  toDisplayImg = false;

  // Get ID To Update Item
  gotId: string =''

  // Get Data To Show it in Input
  discount:string = ''
  newName:string = ''
  newNameAr:string = ''
  newDiscount:number = 0
  //////////////////////////////////////////////////////////////////////////
  constructor(private formBulider : FormBuilder,private catService:CategoriesService, private fs:AngularFirestore) {
//////////////////////////////////////////////////////////////////////////////////////
    this.userFormGroup = this.formBulider.group({
      name:['',[Validators.required]],
      nameAr:['',[Validators.required]],
      discount:[''],
      img:['',[Validators.required]],
      // imgUrl:[''],
      subcollections:formBulider.array([formBulider.group({
        EN:['',[Validators.required]],
        AR:['',[Validators.required]]
      } 
        ),])
    })
//////////////////////////////////////////////////////////////////////////////////////
    this.Attributes = this.formBulider.group({
      Newid:['',[Validators.required]],
      newCatName:['',[Validators.required]],
      newDocID:['',[Validators.required]],
      attributes:formBulider.array([formBulider.control('')],[Validators.required]),
      attributesAr:formBulider.array([formBulider.control('')],[Validators.required]),
    })
//////////////////////////////////////////////////////////////////////////////////////
    this.uploadUpdateImg = this.formBulider.group({
      updateImg:['',[Validators.required]],
    })
  }
//////////////////////////////////////////////////////////////////////////////////////
get name(){
    return this.userFormGroup.get('name')
  }
  get nameAr(){
    return this.userFormGroup.get('nameAr')
  }
  get discont(){
    return this.userFormGroup.get('discount')
  }
  get img(){
    return this.userFormGroup.get('img')
  }
  get updateImg(){
    return this.uploadUpdateImg.get('updateImg')
  }
  get subcollections(){
    return this.userFormGroup.get('subcollections') as FormArray
  }
//////////////////////////////////////////////////////////////////////////////////////
  // Add Attributes
  get Newid(){
    return this.Attributes.get('Newid') 
  }
  get newCatName(){
    return this.Attributes.get('newCatName') 
  }
  get newDocID(){
    return this.Attributes.get('newDocID') 
  }
  get attributes(){
    return this.Attributes.get('attributes') as FormArray
  }
  get attributesAr(){
    return this.Attributes.get('attributesAr') as FormArray
  }
//////////////////////////////////////////////////////////////////////////////////////
  addSub(){
    this.subcollections.push(
      this.formBulider.group({
      EN:['',[Validators.required]],
      AR:['',[Validators.required]]}
      ));
  }
  RemoveSub(){
    this.subcollections.removeAt(1);
  }
  addAttributes(){
    this.attributes.push(this.formBulider.control(''));
  }
  RemoveAttributes(){
    this.attributes.removeAt(1);
  }
  addAttributesAr(){
    this.attributesAr.push(this.formBulider.control(''));
  }
  RemoveAttributesAr(){
    this.attributesAr.removeAt(1);
  }
//////////////////////////////////////////////////////////////////////////////////////
  ngOnChanges(): void {
  }
// Send Id and Data to Update
  sendId(id:any,name:string,nameAr:string, discount:number, subcollections:any){
    this.gotId = id
    this.newName = name
    this.newNameAr = nameAr
    this.newDiscount = discount
    this.userFormGroup.value.subcollections = subcollections
    
    this.toDisplay = !this.toDisplay;
    for(let i=0; i<subcollections.length-1;i++){
      this.addSub()
    }
    this.userFormGroup.patchValue({
      subcollections : subcollections
    })
  }
  sendIdImage(id:any){
    this.gotId = id
    this.toDisplayImg = !this.toDisplayImg;
  }
//////////////////////////////////////////////////////////////////////////////////////
// Updating
  updateTutorial(id:any) : void {
    this.toDisplay = !this.toDisplay;
    const data = {
      name:this.newName,
      nameAr:this.newNameAr,
      discount:this.newDiscount,
      subcollections: this.userFormGroup.value.subcollections,
    };
    if (id) {
      this.catService.update( data,id)
        .then(() => console.log('done'))
        .catch(err => console.log(err));
    }
  }
  updateImage(id:any) : void {
    this.toDisplayImg = !this.toDisplayImg;
    if (id) {
      this.catService.newImage(
        'Categories', 
          id, 
          ((document.getElementById('addImgUpdate') as HTMLInputElement)?.files as FileList)[0]
      )
        .then(() => console.log('done'))
        .catch(err => console.log(err));
    }
    
  }
//////////////////////////////////////////////////////////////////////////////////////
deleteTutorial(id:any): void {
    if (id) {
      this.catService.delete(id)
        .then(() => {
        })
        .catch(err => console.log(err));
    }
  }
//////////////////////////////////////////////////////////////////////////////////////
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
      console.log(this.categories[0].subcollections)
    })
  }
/////////////////////////////////////////////////////////////////////////////////

  saveCat(){
    return this.catService.addToCategory(
      'Categories', 
        this.userFormGroup.value.name, 
        {
          name:this.userFormGroup.value.name,
          nameAr:this.userFormGroup.value.nameAr,
          discount:this.userFormGroup.value.discount,
          subcollections:this.userFormGroup.value.subcollections,
          img:((document.getElementById('addImg') as HTMLInputElement)?.files as FileList)[0]
        }
    )
    .then(()=>{
        this.submitted = true
        this.userFormGroup.reset(); 
      })    
  }
  addCollectionInDoc(){
    return this.catService.addCollectionInDoc(
      'Categories',
      this.Attributes.value.Newid,
      this.Attributes.value.newCatName,
      this.Attributes.value.newDocID,
      {attributes:this.Attributes.value.attributes,attributesAr:this.Attributes.value.attributesAr}
      )
      .then(()=>{
        this.Attributes.reset(); 
      })
  }

  newCat(){
    this.submitted = false
    this.category = new Category()
  }
/////////////////////////////////////////////////////////////////////////////////


ngOnInit(): void {
  this.retrieveCats()
}  
}
