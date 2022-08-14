import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Category } from 'app/Models/category';
import { Product } from 'app/Models/product';
import { ProductService } from 'app/Services/product.service';
import { CategoriesService } from 'app/Services/category.service';
import { Brand } from 'app/Models/brand';
import { BrandService } from 'app/Services/brand.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent implements OnInit {
  Add:boolean = false;
  updatedID: string | null = null;
  saveProductForm!:FormGroup;
  updatedProduct: Product = {} as Product;
  isload:boolean = false;
  done:boolean = false;
  catList:Category[] =[];
  brandList:Array<any> =[];
  parentCat:Category|null = null;
  childCatList:string[] =[];
  currentSpecificControls:string[]=[];
  currentSpecificControlsAR:string[]=[];
//=== Bindig Form Variables 
  subCat:any;
  // processorBind:any;
  Binds:any ={processor: null, touchScreen:null, Ram:null, displaySize:null, OS:null,
              type:null, storage:null, graphicsMemory:null, color:null, rearCamera:null,
              connectivity:null, GPS:null, SIMCount:null, tvCat:null, HDtech:null, Type:null,
              displayType:null, motionRate:null, value:null, ProBrandName:null};

  constructor(  private activatedRoute:ActivatedRoute
              , private route:Router
              , private formBuilder : FormBuilder
              , private productService: ProductService
              , private CatService: CategoriesService
              , private BrandService: BrandService) {

    this.saveProductForm = formBuilder.group({
      ProName: ['',[Validators.required, Validators.minLength(5)]],
      ProNameAR: ['',[Validators.required, Validators.minLength(5)]],
      ProBrandName:[  ,[Validators.required, Validators.minLength(2)]],
      ProBrandNameAR:[ ,[Validators.required, Validators.minLength(2)]],
      ProDescription:['',[Validators.required, Validators.minLength(8)]],
      ProDescriptionAR:['',[Validators.required, Validators.minLength(8)]],
      ProQuantity: ['',[Validators.required,]],
      ProPrice:['',[Validators.required,]],
      ProDiscount:['',[Validators.required,]],
      ProImages: formBuilder.array([['',[]]]),
      ProSku:['',[Validators.required, Validators.pattern('[0-9]{6}')]],
      ProCatName:[this.subCat ,[Validators.required,]],
      ProCatNameAR:[this.subCat ,[Validators.required,]],
            
      // ProImgsDescription:['',[]],
      // Specific Attributes
      // touchScreenAR:[,[Validators.required]],
      // processorAR:[,[Validators.required]],
      // RamAR:[,[Validators.required]],
      // displaySizeAR:[,[Validators.required]],
      // OSAR:[,[Validators.required]],
      // typeAR:[,[Validators.required]],
      // storageAR:[,[Validators.required]],
      // graphicsMemoryAR:[,[Validators.required]],
      // colorAR:[,[Validators.required]],
      // rearCameraAR:[,[Validators.required]],
      // connectivityAR:[,[Validators.required]],
      // GPSAR:[,[Validators.required]],
      // SIMCountAR:[,[Validators.required]],
      // tvCatAR:[,[Validators.required]],
      // HDtechAR:[,[Validators.required]],
      // TypeAR:[,[Validators.required]],
      // displayTypeAR:[,[Validators.required]],
      // motionRateAR:[,[Validators.required]],
      // valueAR:[,[Validators.required]]
  }, {validators:[this.BrandLangValidator()]})
  }

  ngOnInit(): void {    
    this.CatService.getAllCat().snapshotChanges().subscribe((res)=>{
      this.catList = res.map((cat)=>({
        ...cat.payload.doc.data(),
        id: cat.payload.doc.id
      }));
    })
    this.BrandService.getAllBrands().subscribe((res)=>{
      this.brandList = res.map((brand)=>({
          name:brand.payload.doc.data().name,
          nameAR:brand.payload.doc.data().nameAR
      }
      ))
    })

    this.activatedRoute.paramMap.subscribe((params)=>{
      if(params.get('id')) //Update
      {
        this.Add = false;
        this.updatedID = params.get('id');
        this.productService.getByID(this.updatedID as string).subscribe((product: Product)=>{
          this.updatedProduct=product;
          for(let i=0; i< product.images.length-1; i++)
          {
            this.addNewProductImg()
          }
          console.log(product.categoryName);
          
          this.changeSubCat(product.categoryName).then(()=>{
            console.log('in thin');
            this.saveProductForm.patchValue({
              ProName: product.name,
              ProNameAR: product.nameAR,
              ProBrandName:product.brandName,
              ProBrandNameAR:product.brandNameAR,
              ProDescription:product.description,
              ProDescriptionAR:product.descriptionAR,
              ProQuantity: product.quantity,
              ProPrice: product.price,
              ProDiscount: product.discount,
              ProSku: product.sku,
              ProCatName: product.categoryName,
              ProCatNameAR: product.categoryNameAR,
              
              // ProImages:  product.images,
              // ProImgsDescription: product.imgsDescription
              touchScreen: product.touchScreen,
              processor: product.processor,
              Ram:product.Ram,
              displaySize: product.displaySize,
              OS: product.OS,
              type: product.type,
              storage: product.storage,
              graphicsMemory: product.graphicsMemory,
              color: product.color,
              rearCamera: product.rearCamera,
              connectivity: product.connectivity,
              GPS: product.GPS,
              SIMCount: product.SIMCount,
              tvCat: product.tvCat,
              HDtech: product.HDtech,
              Type: product.Type,
              displayType: product.displayType,
              motionRate: product.motionRate,
              value: product.value,
              // AR
              touchScreenAR: product.touchScreenAR,
              processorAR: product.processorAR,
              RamAR:product.RamAR,
              displaySizeAR: product.displaySizeAR,
              OSAR: product.OSAR,
              typeAR: product.typeAR,
              storageAR: product.storageAR,
              graphicsMemoryAR: product.graphicsMemoryAR,
              colorAR: product.colorAR,
              rearCameraAR: product.rearCameraAR,
              connectivityAR: product.connectivityAR,
              GPSAR: product.GPSAR,
              SIMCountAR: product.SIMCountAR,
              tvCatAR: product.tvCatAR,
              HDtechAR: product.HDtechAR,
              TypeAR: product.TypeAR,
              displayTypeAR: product.displayTypeAR,
              motionRateAR: product.motionRateAR,
              valueAR: product.valueAR
            })

            this.Binds ={ ...this.Binds, processor: product.processorAR, touchScreen:product.touchScreenAR,
              Ram:product.RamAR, displaySize:product.displaySizeAR, OS:product.OSAR, type:product.typeAR,
              storage:product.storageAR, graphicsMemory:product.graphicsMemoryAR, color:product.colorAR,
              rearCamera:product.rearCameraAR, connectivity:product.connectivityAR, GPS:product.GPSAR,
              SIMCount:product.SIMCountAR, tvCat:product.tvCatAR, HDtech:product.HDtechAR, Type:product.TypeAR,
              displayType:product.displayTypeAR, motionRate:product.motionRateAR, value:product.valueAR};
          }).catch((err)=>{console.log(err)}
          )
        })
        this.ProCategoryPro?.removeValidators([Validators.required]);
        this.ProCategoryProAR?.removeValidators([Validators.required]);
      }
      else //Add
      {
        this.Add = true;
        this.updatedID = null;
        this.ProImgsPro.controls[0].addValidators([Validators.required]);
      }

    })
  }

  get ProNamePro()
  {
    return this.saveProductForm.get('ProName');
  }
  get ProNameProAR()
  {
    return this.saveProductForm.get('ProNameAR');
  }
  get ProBrandPro()
  {
    return this.saveProductForm.get('ProBrandName');
  }
  get ProBrandProAR()
  {
    return this.saveProductForm.get('ProBrandNameAR');
  }
  get ProDescriptionPro()
  {
    return this.saveProductForm.get('ProDescription');
  }
  get ProDescriptionProAR()
  {
    return this.saveProductForm.get('ProDescriptionAR');
  }
  get ProQuantityPro()
  {
    return this.saveProductForm.get('ProQuantity');
  }
  get ProPricePro()
  {
    return this.saveProductForm.get('ProPrice');
  }
  get ProDiscountPro()
  {
    return this.saveProductForm.get('ProDiscount');
  }
  get ProImgsPro()
  {
    return this.saveProductForm.get('ProImages') as FormArray
  }
  get ProSKUPro()
  {
    return this.saveProductForm.get('ProSku');
  }
  get ProCategoryPro()
  {
    return this.saveProductForm.get('ProCatName');
  }
  get ProCategoryProAR()
  {
    return this.saveProductForm.get('ProCatNameAR');
  }
  get ProImgsDescriptionPro()
  {
    return this.saveProductForm.get('ProImgsDescription');
  }

  addNewProductImg()
  {
    this.Add?
    this.ProImgsPro.push(this.formBuilder.control('',[Validators.required]))
    :this.ProImgsPro.push(this.formBuilder.control('',[]))
  }
  removeProductImg(i:number)
  {
    this.ProImgsPro.removeAt(i);
    if(!this.Add)
    {
      this.updatedProduct.images.splice(i,1);
    }
  }

  BrandLangValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        let brandEn = control.get('ProBrandName')
        let brandAR = control.get('ProBrandNameAR')

        if ((brandAR?.untouched && brandEn?.untouched) || !brandAR?.value || !brandEn?.value) {
            return null;
        }
        // console.log(brandAR?.value, brandEn?.value, brandAR?.value!= brandEn?.value);
        
        return brandAR?.value!= brandEn?.value? {brandsLang:true}: null;
    }
}

  changeCat()
  {
      this.childCatList = [];
      this.catList.find((cat)=>cat.id==this.parentCat?.id)?.subcollections.forEach((ele)=>{
        this.childCatList?.push(ele);
      })
  }
  changeSubCat(proCatUpdated?:string) :Promise<void>
  {
    console.log(proCatUpdated, 'in fun');
    
    return new Promise((resolve)=>{
      this.currentSpecificControls.forEach((ele)=>{
        this.saveProductForm.removeControl(ele);
      })
      this.currentSpecificControlsAR.forEach((ele)=>{
        this.saveProductForm.removeControl(ele);
      })

      this.ProCategoryPro?.setValue(this.Add?(this.subCat?this.subCat.EN:null):proCatUpdated)
      this.ProCategoryProAR?.setValue(this.Add?(this.subCat?this.subCat.AR:null):proCatUpdated)
      // console.log(this.ProCategoryPro?.value, this.subCat);
      console.log(this.subCat);
      
      if(this.subCat || proCatUpdated)
      {
        this.CatService.getSubCategory(this.Add?this.subCat.EN:proCatUpdated).subscribe((res)=>{
          let data:any = res[0].payload.doc.data();
          this.currentSpecificControls = data.attributes;
          this.currentSpecificControlsAR = data.attributesAR;
          this.currentSpecificControls.forEach((ele:string)=>{
                this.saveProductForm.addControl(ele, this.formBuilder.control(null ,[Validators.required]));
          })
          this.currentSpecificControlsAR.forEach((ele:string)=>{
                this.saveProductForm.addControl(ele, this.formBuilder.control(null ,[Validators.required]));
          })
          resolve();
        })
      }
      // if(!this.subCat && proCatUpdated)
      // {
      //   this.ProCategoryPro?.setValue(this.subCat?this.subCat.EN:null)
      //   this.ProCategoryProAR?.setValue(this.subCat?this.subCat.AR:null)
      // }
    })
  }

  changeField(trueIfEN:boolean, controlName:string)
  {
    if(trueIfEN)
    {
      this.Binds[controlName] = this.saveProductForm.get(controlName)?.value;
    }
    else
    {
      this.saveProductForm.get(controlName)?.setValue(this.Binds[controlName]);
    }
    this.saveProductForm.get(controlName)?.setValue(this.Binds[controlName]?this.Binds[controlName].EN:null);
    this.saveProductForm.get(`${controlName}AR`)?.setValue(this.Binds[controlName]?this.Binds[controlName].AR:null);
  }
  channgBoolianFormLang(controlName:string)
  {
    this.saveProductForm.get(controlName+"AR")?.setValue(this.saveProductForm.get(controlName)?.value?'متوفر':"غير متوفر")
  }

  SaveProduct()
  {
    this.isload = true;
    let images: (string | File)[] = [];
    this.ProImgsPro.controls.forEach((image, index)=>{
      let imgfile: File = ((document.getElementById('proImg-'+index) as HTMLInputElement)?.files as FileList)[0];        
      let img = this.Add?imgfile:(imgfile?imgfile:this.updatedProduct.images[index])
        images.push(img);
    });

    let Prd:Product = {
      name: this.ProNamePro?.value,
      nameAR: this.ProNameProAR?.value,
      brandName: this.ProBrandPro?.value.name,
      brandNameAR: this.ProBrandProAR?.value.nameAR,
      description:this.ProDescriptionPro?.value,
      descriptionAR:this.ProDescriptionProAR?.value,
      quantity:this.ProQuantityPro?.value,
      price:this.ProPricePro?.value,
      discount:this.ProDiscountPro?.value,
      images:images,
      sku: this.ProSKUPro?.value,
      categoryName: this.ProCategoryPro?.value,
      categoryNameAR: this.ProCategoryProAR?.value,
      seller:"X-Cite",
      sellerAR:"اكسسايت",
      AddedBy:''
    }
    this.currentSpecificControls.forEach((ele)=>{
      Object.defineProperty(Prd,ele, {
        value:this.saveProductForm.get(ele)?.value,
        enumerable: true
      })
    })
    this.currentSpecificControlsAR.forEach((ele)=>{
      Object.defineProperty(Prd,ele, {
        value:this.saveProductForm.get(ele)?.value,
        enumerable: true
      })
    })
       console.log(Prd);
        
    if (this.Add)
    {
      this.productService.addNewPrd(Prd).then(()=>{
      this.Saved()
      })
    }
    else
    {
      this.productService.updatePrd(Prd, this.updatedID as string, this.updatedProduct ).then(()=>{
        this.Saved();
      })
    }
  }

  Saved()
  {
    console.log('in save')
    this.isload = false;
    this.done = true;
    this.saveProductForm.reset();
    // this.saveProductForm.patchValue({
    //   ProName:''
    // })
    setTimeout(() => {
      if(this.Add)
      {
        this.route.navigate(['/Products']);
      }
      else
      {
        this.route.navigate([`/Product/${this.updatedID}`]);
      }
    }, 3000);
  }



// =============================== Data ==============================================
  processor:Array<{EN:string, AR:string}> = [{EN:'Intel Core i3', AR:'انتل كور آي3'}, {EN:'Intel Core i5', AR:'انتل كور آي5'},
  {EN: 'Intel Core i7', AR:'انتل كور آي7'}, {EN:'Intel® Core™ i7 processor', AR:'انتل كور تي ام آي7 معالج'},
  {EN:'Intel Core i9' , AR:'انتل كور آي9'}, {EN:'Intel Celeron N4020', AR:'انتل سيليرون ان فور 4020'},
  {EN:'Intel Celeron N4500', AR:'انتل سيليرون ان فور 4500'},{EN:'Intel Pentium', AR:'انتل باتينيوم'},
  {EN: 'M1', AR:'إم1'},{EN:'M2', AR:'إم2'},{EN:'M1 Pro', AR:'إم1 برو'},{EN:'M1 Max', AR:'إم1 ماكس'},
  {EN:'AMD Ryzen 7', AR:'امد ريزن 7'},{EN:'AMD Ryzen 5', AR:'امد ريزن 5'},{EN:'AMD Ryzen R5', AR:'امد ريزن آر5'},
  {EN:'AMD Ryzen 9', AR:'امد ريزن 9'}, {EN:'Microsoft SQ1', AR:'ميكروسوفت اس كيو 1'},
  {EN:'A15 Bionic', AR:'إي15 بيونيك'},{EN:'Embedded M12', AR:'امبيديد إم12'}, {EN:'Quad Core', AR:'كواد كور'},
  {EN:'A12X Bionic Chip', AR:'إي12 بيونيك شيب'},{EN:'A13 Bionic chip', AR:'إي13 بيونيك شيب'},
  {EN:'A10 Fusion Chip' , AR:'إي10 فيوشن شيب'}, {EN:'M10', AR:'إم10'},{EN:'4nm', AR:'فور إن إم'},
  {EN:'Apple M1 Chip', AR:'أبل إم1 شيب'}, {EN:'Exynos 9611', AR:'إكسينوس 9611'},
  {EN: 'Octa Core', AR:'أوكتا كور'} ,{EN:'Chipset MT8765', AR:'تشيب سيت إم تي 8765'},
  {EN: 'Dual Core', AR:'دوال كور'},{EN: 'ARM Cortex A7', AR:'إي آر إم كورتيكست إي7'},
  {EN:'MTK MT8768', AR:'إم تي كي إم تي8768'}, {EN:'MediaTek', AR:'ميديا تيك'},
  {EN:'MediaTek Helio G90T', AR:'ميديا تيك هيليو جي0 تي'}, {EN:'MediaTek MT8765', AR:'ميديا تيك إم تي 8765'},
  {EN: 'Kirin 710A', AR:'كيرين 710إي'}, {EN:'Kirin 810', AR:'كيرين 810'},{EN:'Kirin 990', AR:'كيرين 990'},
  {EN:'Kirin 659', AR:'كيرين 659'}, {EN:'Kirin 9000E', AR:'كيرين 9000إي'}, {EN:'Kirin 960', AR:'كيرين 960'},
  {EN:'Qualcomm MSM', AR:'كوالكوم إم إس إم'}, {EN:'Qualcomm Snapdragon', AR:'كوالكوم سناب دراجون'},
  {EN:'Qualcomm Snapdragon 865', AR:'كوالكوم سناب دراجون 865'}, {EN:'Qualcomm Snapdragon 730G', AR:'كوالكم سناب دراجون 730جي'}]

  Ram:Array<{EN:string, AR:string}>=[{EN:'-', AR:'-'}, {EN:'2GB', AR:'2 جيجا بايت'}, {EN:'4GB', AR:'4 جيجا بايت'},
   {EN:'8GB', AR:'8 جيجا بايت'},{EN: '12GB', AR:'12 جيجا بايت'},{EN: '16GB', AR:'16  جيجا بايت'},
   {EN: '24GB', AR:'24 جيجا بايت'},{EN: '32GB', AR:'32 جيجا بايت'}];

  displaySize:Array<{EN:string, AR:string}>= [{EN: '6-inch', AR:'6 بوصة'}, {EN: '6.4-inch', AR:'6.4 بوصة'},
   {EN: '6.9-inch', AR:'6.9 بوصة'}, {EN: '7-inch', AR:'7 بوصة'}, {EN: '7.9-inch', AR:'7.9 بوصة'},
   {EN: '8-inch', AR:'8 بوصة'},{EN: '8.3-inch', AR:'8.3 بوصة'}, {EN: '8.5-inch', AR:'8.5 بوصة'},
   {EN: '8.7-inch', AR:'8.7 بوصة'}, {EN: '9-inch', AR:'9 بوصة'}, {EN: '9.6-inch', AR:'9.6 بوصة'},
   {EN: '9.7-inch', AR:'9.7 بوصة'}, {EN: '10-inch', AR:'10 بوصة'}, {EN: '10.0-inch', AR:'10.0 بوصة'},
   {EN: '10.1-inch', AR:'10.1 بوصة'}, {EN: '10.2-inch', AR:'10.2 بوصة'}, {EN: '10.3-inch', AR:'10.3 بوصة'},
   {EN: '10.4 inch', AR:'10.4 بوصة'}, {EN: '10.5-inch', AR:'10.5 بوصة'}, {EN: '10.8-inch', AR:'10.8 بوصة'},
   {EN: '10.9-inch', AR:'10.9 بوصة'}, {EN: '11-inch', AR:'11 بوصة'}, {EN: '11.6-inch', AR:'11.6 بوصة'},
   {EN: '12.3-inch', AR:'12.3 بوصة'}, {EN: '12.4-inch', AR:'12.4 بوصة'}, {EN: '12.6-inch', AR:'12.6 بوصة'},
   {EN: '12.9-inch', AR:'12.9 بوصة'}, {EN: '13-inch', AR:'13 بوصة'}, {EN: '13.3-inch', AR:'13.3 بوصة'},
   {EN: '13.5-inch', AR:'13.5 بوصة'}, {EN: '13.6-inch', AR:'13.6 بوصة'}, {EN: '13.9-inch', AR:'13.9 بوصة'},
   {EN: '14-inch', AR:'14 بوصة'}, {EN: '14.1-inch', AR:'14.2-inch'}, {EN: '14.4-inch', AR:'14.4 بوصة'},
   {EN: '14.6-inch', AR:'14.6 بوصة'}, {EN: '15-inch', AR:'15 بوصة'}, {EN: '15.4-inch', AR:'15.4 بوصة'},
   {EN: '15.6-inch', AR:'15.6 بوصة'}, {EN: '16-inch', AR:'16 بوصة'}, {EN: '16.2-inch', AR:'16.2 بوصة'},
   {EN: '17.3-inch', AR:'17.3 بوصة'}, {EN: '19 inch', AR:'19 بوصة'}, {EN: '24 inch', AR:'24 بوصة'},
   {EN: '32 inch', AR:'32 بوصة'}, {EN: '40 inch', AR:'40 بوصة'}, {EN: '43 inch', AR:'43 بوصة'},
   {EN: '47 inch', AR:'47 بوصة'}, {EN: '48 inch', AR:'48 بوصة'}, {EN: '49 inch', AR:'49 بوصة'},
   {EN: '50 inch', AR:'50 بوصة'}, {EN: '55 inch', AR:'55 بوصة'}, {EN: '58 inch', AR:'58 بوصة'},
   {EN: '60 inch', AR:'60 بوصة'}, {EN: '65 inch', AR:'65 بوصة'}, {EN: '70 inch', AR:'70 بوصة'},
   {EN: '75 inch', AR:'75 بوصة'}, {EN: '77 inch', AR:'77 بوصة'}, {EN: '82 inch', AR:'82 بوصة'},
   {EN: '83 inch', AR:'83 بوصة'}, {EN: '85 inch', AR:'85 بوصة'}, {EN: '86 inch', AR:'86 بوصة'},
   {EN: '98 inch', AR:'98 بوصة'}, {EN: '100 inch', AR:'100 بوصة'}]
 
  OS:Array<{EN:string, AR:string}>=[{EN: 'Mac OS', AR:'ماك أو إس'}, {EN: 'Mac OS X', AR:'ماك أو إس إكس'},
    {EN: 'Microsoft DOS', AR:'ميكروسوفت دوس'}, {EN: 'Windows 10', AR:'ويندوز 10'},
    {EN: 'Windows 10 Pro', AR:'ويندوز 10 برو'}, {EN: 'Windows 10 Home', AR:'ويندوز 10 هوم'},
    {EN: 'Windows 10 S', AR:'ويندوز 10 إس'}, {EN: 'Windows 10 S mode', AR:'ويندوس 10 إس مود'},
    {EN: 'Windows 11', AR:'ويندوز 11'}, {EN: 'Windows 11 Pro', AR:'ويندوز 11 برو'},
    {EN: 'Windows 11 Home', AR:'ويندوز 11 هوم'}, {EN: 'Windows 11 S', AR:'ويندوز 11 إس'},
    {EN: 'Windows 11 S Mode', AR:'ويندوز 11 إس مود'}, {EN: 'Windows 11 Home S Mode', AR:'ويندوز 11 هوم إس مود'},
    {EN: 'iOS 10', AR:'آي أو إس 10'}, {EN: 'iOS 12', AR:'آي أو إس 12'}, {EN: 'iOS 13.0', AR:'آي أو إس 13'},
    {EN: 'IOS 14', AR:'آي أو إس 14'}, {EN: 'iOS 15', AR:'آي أو إس 15'}, {EN: 'IPadOS', AR:'آيباد أو إس'},
    {EN: 'iPadOS 14', AR:'آيباد أو إس 14'}, {EN: 'iPadOS 15', AR:'آيباد أو إس 15'},
    {EN: 'iPadOS 15.3', AR:'آيباد أو إس 15.3'}, {EN: 'Android', AR:'أندرويد'},
    {EN: 'Android OS', AR:'أندرويد أو إس'}, {EN: 'Android 7.0', AR:'أندرويد 7.0'},
    {EN: 'Android 8.0', AR:'أندرويد 8.0'}, {EN: 'Android 8 Oreo', AR:'أندرويد 8 أوريو'},
    {EN: 'Android 8.1', AR:'أندرويد 8.1'}, {EN: 'Android 8.1 Oreo', AR:'أندرويد 8.1 أوريو'},
    {EN: 'Android 9', AR:'أندرويد 9'}, {EN: 'Android 9 GO', AR:'أندرويد 9 جو'},
    {EN: 'Android 9.0 (Pie)', AR:'أندرويد 10 (باي)'}, {EN: 'Android 10', AR:'أندرويد 10'},
    {EN: 'Android 10 pie', AR:'أندرويد 10 باي'},{EN: 'Android 11', AR:'أندرويد 11'},
    {EN: 'Android 11 Pie', AR:'أندرويد 11 باي'}, {EN: 'Android 11, One UI 3.1', AR:'أندرويد 11، ون يو آي 3.1'},
    {EN: 'Android 12', AR:'أندرويد 12'}, {EN: 'Android Pie 12', AR:'أندرويد باي 12'},
    {EN: 'Android Oreo (Go edition)', AR:'أندرويد أوريو (إصدار جو)'},
    {EN: 'Android Lollipop 5.1', AR:'أندرويد لوليبوب 5.1'},{EN: 'Android Marshmallow 6.0', AR:'أندرويد مارشمالو 6.0'},
    {EN: 'Android Nougat 7.0', AR:'أندرويد نوجات 7.0'}, {EN: 'EMUI 10.0.1', AR:'إم يو آي 10.0.1'},
    {EN: 'EMUI 12', AR:'إم يو آي 12'}, {EN: 'Linux', AR:'لينكس'}, {EN: 'HarmonyOS 2', AR:'هارموني أو لإس 2'},
    {EN: 'HarmonyOS 2.0', AR:'هارموني أو إس 2.0'}, {EN: 'Proprietary OS', AR:'بروبيريتاري أو لإس'},
    {EN: 'Series 30+', AR:'سلسلة +30'}, {EN: 'Nokia Series 30+', AR:'سلسلة نوكيا +30'}]
      
  type:Array<{EN:string, AR:string}>=[{EN:'Notebook', AR:'نوت بوك'}, {EN:'Convertible', AR:'قابل للتحويل'},
   {EN:'Gaming Laptop', AR:'لابتوب للالعاب'}, {EN:'MacBook', AR:'ماك بوك'}, {EN: 'Ultrabook', AR:'الترا بوك'},
   {EN:'iPhone SE' ,AR:'آيفون اس إي'}, {EN: 'iPhone 11',AR:' 11 آيفون'}, {EN: 'iPhone 11 Pro',AR:'ايفون 11 برو'},
   {EN: 'iPhone 12', AR:'ايفون 12'}, {EN: 'iPhone 12 Pro', AR:'ايفون 12 برو'},
   {EN: 'iPhone 12 Pro Max',AR:'ايفون 12 برو ماكس'}, {EN: 'iPhone 13',AR:'ايفون 13'},
   {EN: 'iPhone 13 mini', AR:'ايفون 13 مصغر'}, {EN: 'iPhone 13 Pro', AR:'ايفون 13 برو'},
   {EN: 'iPhone 13 Pro Max', AR:'ايفون 13 برو ماكس'}, {EN: 'Galaxy A03S', AR:'جالاكسي أي أو 3 اس'},
   {EN: 'Galaxy A32', AR:'جالاكسي اي 32'}, {EN: 'Galaxy A33', AR:'جالاكسي اي 33'},
   {EN: 'Galaxy A52', AR:'جالاكسي اي 52'}, {EN: 'Galaxy A53', AR:'جالاكسي اي 53 '},
   {EN: 'Galaxy A73', AR:'جالاكسي اي 73'}, {EN: 'Galaxy M12', AR:'جالاكسي ام 12'},
   {EN: 'Galaxy M13', AR:'جالاكسي ام 13'}, {EN: 'Galaxy M22', AR:'جالاكسي ام 22'},
   {EN: 'Galaxy S9 Plus', AR:'جالاكسي اس 9 بلس'}, {EN: 'Galaxy S20+', AR:'جالاكسي اس 20 بلس'},
   {EN: 'Galaxy S21 FE', AR:'جالاكسي اس 21 اف إي'}, {EN: 'Galaxy S22', AR:'جالاكسي اس 22'},
   {EN: 'Galaxy S22+', AR:'جالاكسي اس 22 بلس'}, {EN: 'Galaxy S22 Ultra', AR:'جالاكسي اس 22 الترا'},
   {EN: 'Galaxy Z Flip', AR:'جالاكسي زيد فليب'}, {EN: 'Galaxy Z Fold', AR:'جالاكسي زيد فولد'},
   {EN: 'Galaxy Note 10', AR:'جالاكسي نوت 10'}, {EN: 'Galaxy Note 20', AR:'جالاكسي نوت 20'},
   {EN: 'Galaxy Note 20 Ultra', AR:'جالاكسي نوت 20 الترا'}, {EN: 'Redmi Note 11', AR:'ريدمي نوت 11'},
   {EN: 'Redmi Note 11S', AR:'ريدمي نوت 11 اس'}, {EN: 'Redmi Note 10', AR:'ريدمي نوت 10 '},
   {EN: 'Redmi Note 10S', AR:'ريدمي نوت 10'}, {EN: 'Redmi Note 10 Pro', AR:'ريدمي نوت 10 برو'}, 
   {EN: 'Redmi Note 11 Pro', AR:'ريدمي نوت 11 برو'}, {EN: 'Redmi Note 11 Pro +', AR:'ريدمي نوت 11 برو'},
   {EN: 'Redmi 10', AR:'ريدمي 10'}, {EN: 'Redmi 10A', AR:'ريدمي 10 اي'}, {EN: 'Redmi 9C', AR:'ريدمي 9 سي'},
   {EN: 'Redmi 10C',AR:'ريدمي 10 سي'}, {EN: 'A03',AR:'اي زيرو 3'}, {EN: 'A5',AR:'اي 5'},{EN: 'A13',AR:'اي 13'},
   {EN: 'A55', AR:'اي 55'}, {EN: 'A77', AR:'اي 77'}, {EN: 'A95', AR:'اي 95'}, {EN: 'A96', AR:'اي 96'},
   {EN: 'A16K', AR:'اي 16 ك'}, {EN: 'nova 8i', AR:'نوفا 8 آي'}, {EN: 'nova 9', AR:'نوفا 9'},
   {EN: 'nova 9 SE', AR:'نوفا 9 اس إي'}, {EN: 'nova Y70', AR:'نوفا واي 70'}, {EN: 'Nord', AR:'نورد'},
   {EN: 'Nord 2', AR:'نورد 2'}, {EN: 'Nord CE 2', AR:'نورد سي إي 2'}, {EN: 'Nord 2T', AR:'نورد 2 تي'},
   {EN: 'Pixel 6', AR:' بيكسل 6'}, {EN: 'Pixel 6 Pro', AR:'بيكسل 6 برو'}, {EN: 'Moto E', AR:'موتو إي'},
   {EN: 'Moto Edge 20', AR:'موتو ايدج 20'}, {EN: 'Moto Edge 30', AR:'موتو ايدج 30'},
   {EN: 'Moto Edge 30 Pro', AR:'موتو ايدج 30 برو'},
   {EN: 'Moto G', AR:'موتو جى'}, {EN: 'Moto G31', AR:'موتو جي 31'}, {EN: 'Moto G51', AR:'موتو جي 51'},
   {EN: 'Moto G71', AR:'موتو جي 71'}, {EN: 'Moto G82', AR:'موتو جي 82'}, {EN: '4 Pro', AR:'4 برو'},
   {EN: '7.1', AR:'7 بوينت 1'}, {EN: '10 Pro', AR:'10 برو'}, {EN: '11T Pro', AR:'11 تي برو'},
   {EN: '12', AR:'12'}, {EN: '12 Pro', AR:'12 برو'}, {EN: '20 R', AR:'20 ار'}, {EN: '20 SE', AR:'20 إس إي'},
   {EN: '20L+', AR:'20 إل بلس'}, {EN: '106', AR:'106'}, {EN: '110', AR:'110'}, {EN: '104', AR:'104'},
   {EN: '105', AR:'105'}, {EN: '130', AR:'130'}, {EN: '150 TA-1253', AR:'150 تي إي-1253'},
   {EN: '305', AR:'305'}, {EN: 'Poco X3 GT', AR:'بوكو اكس 3 جي تي'},
   {EN: 'Poco X4 GT 5G', AR:'بوكو اكس 4 جي تي 5 جي'}, {EN: 'Poco X4 Pro', AR:'بوكو اكس 4 برو'},
   {EN: 'Poco F3', AR:'بوكو إف 3'}, {EN:'Poco F4 GT',AR:'بوكو إف4 جي تي'}, {EN:'Poco M4 Pro',AR:'بوكو إم4 برو'},
   {EN:'C1',AR:'سي1'}, {EN:'C20',AR:'سي20'}, {EN:'C30',AR:'سي30'}, {EN:'M32',AR:'إم32'}, {EN:'M33',AR:'إم33'},
   {EN:'Mi 11 Lite',AR:'إم آي 11 لايت'}, {EN:'Mi 11T Pro',AR:'إم آي 11تي برو'}, {EN:'E20',AR:'إي20'},
   {EN:'G10',AR:'جي10'}, {EN:'G21',AR:'جي21'}, {EN:'Y5P',AR:'واي 5 بي'}, {EN:'Y6P',AR:'واي 6 بي'},
   {EN:'Y9a',AR:'واي 9 ايه'}, {EN:'Y15s',AR:'واي 15 إس'}, {EN:'Y21',AR:'واي 21'}, {EN:'Y21T',AR:'واي 21 تي'},
   {EN:'Y33s',AR:'واي 33 إس'}, {EN:'Y55',AR:'واي 55'}, {EN:'Y72',AR:'واي 72'}, {EN:'Y76',AR:'واي 76'},
   {EN:'Y5 Lite',AR:'واي 5 لايت'}, {EN:'Y6 2019',AR:'واي 6 2019'}, {EN:'P50',AR:'بي 50'},
   {EN:'P50 Pocket',AR:'بي 50 بوكيت'}, {EN:'P50 Pro',AR:'بي 50 برو'}, {EN:'X70',AR:'إكس 70'},
   {EN:'Mate XS 2',AR:'ميت إكس إس 2'}, {EN:'Oppo A16K',AR:'أوبو ايه 16 كي'}, {EN:'V21',AR:'في 21'},
   {EN:'Vivo Y20S',AR:'فيفو واي 20إس'}, {EN:'Reno7',AR:'رينو7'}, {EN:'Reno7 Pro',AR:'رينو 7 برو'},
   {EN:'Reno7 Z',AR:'رينو7 زيد'}, {EN:'iTunes',AR:'آيتونز'}, {EN:'GooglePlay',AR:'جوجل بلاي'}]

  storage:Array<{EN:string, AR:string}>=[{EN: '4MB', AR:'4 ميجا بايت'}, {EN: '32MB', AR:'32 ميجا بايت'},
   {EN: '4GB', AR:'4 جيجا بايت'}, {EN: '8GB', AR:'8 جيجا بايت'}, {EN: '16GB', AR:'16 جيجا بايت'},
   {EN: '32GB', AR:'32 جيجا بايت'}, {EN: '64GB', AR:'64 جيجا بايت'}, {EN: '128GB', AR:'128 جيجا بايت'},
   {EN: '256GB', AR:'256 جيجا بايت'}, {EN: '256GB SSD', AR:'256 جيجا بايت إس إس دي'},
   {EN: '512GB', AR:'512 جيجا بايت'}, {EN: '1TB', AR:'1 تيرا بايت'}, {EN: '2TB', AR:'2 تيرا بايت'},
   {EN: '512 GB SSD', AR:'512 جيجا بايت إس إس دي'}, {EN: '1TB SSD', AR:'1 تيرا بايت إس إس دي'},
   {EN: '256 GB SSD', AR:'256 جيجا بايت إس إس دي'}, {EN: '128 GB SSD', AR:'128 جيجا بايت إس إس دي'},
   {EN: '1TB HDD', AR:'1 تيرا بايت إتش دي دي'}, {EN: '512GB SSD', AR:'512 جيجا بايت إس إس دي'},
   {EN: '1TB HDD,256 GB SSD', AR:'1 تيرا بايت إتش دي دي، 256 جيجا بايت إس إس دي'},
   {EN: '1TB HDD,128 GB SSD', AR:'1 تيرا بايت إتش دي دي، 128 جيجا بايت إس إس دي'},
   {EN: '1TB + 128GB SSD', AR:'1 تيرا بايت + 128 جيجا بايت إس إس دي'},
   {EN: '1TB + 256GB SSD', AR:'1 تيرا بايت + 256 جيجا بايت إس إس دي'},
   {EN: '256GB SSD, 1TB SSHD', AR:'256 إس إس دي، 1 تيرا بايت إس إس إتش دي'} ]

  graphicsMemory:Array<{EN:string, AR:string}>=[{EN: 'Integrated', AR:'مدمج'}, {EN: '2 GB', AR:'2 جيجا بايت'},
    {EN: '4 GB', AR:'4 جيجا بايت'}, {EN: '6 GB', AR:'6 جيجا بايت'}, {EN: '8 GB', AR:'8 جيجا بايت'},
    {EN: '12 GB', AR:'12 جيجا بايت'}, {EN: '16 GB', AR:'16 جيجا بايت'}]

  color:Array<{EN:string, AR:string}>=[{EN: 'Silver', AR:'فضي'}, {EN: 'Black', AR:'أسود'}, {EN: 'White', AR:'أبيض'},
    {EN: 'Green', AR:'أخضر'}, {EN: 'Red', AR:'أحمر'}, {EN: 'Yellow', AR:'أصفر'}, {EN: 'Grey', AR:'رمادي'},
    {EN: 'Brown', AR:'بني'}, {EN: 'Orange', AR:'برتقالي'}, {EN: 'Purple', AR:'بنفسجي'},
    {EN: 'Bronze', AR:'برونزي'}, {EN: 'Blue', AR:'أزرق'}, {EN: 'Aqua Blue', AR:'أزرق مائي'},
    {EN: 'Pink', AR:'بمبي'}, {EN: 'Gold', AR:'ذهبي'}, {EN: 'Rose Gold', AR:'بمبي مذهب'},
    {EN: 'Platinum', AR:'بلاتيني'}, {EN: 'Multicolour', AR:'متعدد الألوان'}]
    
  connectivity:Array<{EN:string, AR:string}>=[{EN: 'Wi-Fi Only', AR:'واي فاي فقط'},
    {EN: '4G LTE', AR:'4 جي  إل تي إي'}, {EN: '5G', AR:'5 جي'}, {EN: '3G', AR:'3 جي'}]

  SIMCount:Array<{EN:string, AR:string}>=[{EN: 'Dual SIM', AR:'يدعم شريحتين'}, {EN: 'Single SIM', AR:'شريحة واحدة'}]

  tvCat:Array<{EN:string, AR:string}>=[{EN: 'LED', AR:'فائقة الوضوح'}, {EN: 'QLED', AR:'كيو ال اي دي'},
    {EN: 'Gaming', AR:'للألعاب'}, {EN: 'OLED', AR:'او ال اي دي'}]

  HDtech:Array<{EN:string, AR:string}>=[{EN: 'Ultra HD : 2160p', AR:'فائق الوضوح: 2160 بكسل'}, {EN: '4K', AR:'4 كي'},
    {EN: '4K Ultra HD (UHD)', AR:'فائق الوضوح 4 كي'}, {EN: '4K HDR', AR:'نطاق ديناميكي عالي 4 كي'},
    {EN: 'Full HD', AR:'كامل الوضوح'}, {EN: '8K', AR:'8 كي'}, {EN: 'HD', AR:'عالي الوضوح'},
    {EN: 'HD : 720p', AR:'عالي الوضوح: 720 بكسل'}, {EN: 'Full HD : 1080p', AR:'كامل الوضوح بدقة 1080 بكسل'},
    {EN: '8K HDR', AR:'8 كي إتش دي آر'}]

  Type:Array<{EN:string, AR:string}>=[{EN: 'Smart', AR:'ذكي'}, {EN: 'Standard', AR:'عادي'}]

  displayType:Array<{EN:string, AR:string}>=[{EN: '2D', AR:'ثنائي الأبعاد'}, {EN: '3D', AR:'ثلاثي الأبعاد'}]

  rearCamera:Array<{EN:string, AR:string}>=[{EN: '2 Megapixels', AR:'2 ميجابكسل'},
  {EN: '0.3 Megapixels', AR:'0.3 ميجابكسل'}, {EN: '5 Megapixels', AR:'5 ميجابكسل'},
  {EN: '8 Megapixels', AR:'8 ميجا بكسل'}, {EN: '12 Megapixels', AR:'12 ميجابكسل'},
  {EN: '13 Megapixels', AR:'13 ميجابكسل'}, {EN: '13+2 Megapixels', AR:'13+2 ميجابكسل'},
  {EN: '48MP + 8MP + 5MP', AR:'48 ميجابكسل + 8 ميجابكسل + 5 ميجابكسل'},
  {EN: '12MP + 2MP + 2MP', AR:'12 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'},
  {EN: '12MP + 12MP + 64MP',AR:'12 ميجابكسل + 12 ميجابكسل + 64 ميجابكسل'},
  {EN: '64+8+5+2MP', AR:'64+8+5+2 ميجابكسل'}, {EN: '12 + 5 Megapixels', AR:'12+5 ميجابكسل'},
  {EN: '12MP + 12MP + 16MP', AR:''}, {EN: '64MP+ 8MP + 2MP+ 2MP', AR:'64 ميجابكسل + 8 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'},
  {EN: '8+2MP', AR:'8+2 ميجابكسل'}, {EN: '50MP + 8MP + 2MP', AR:'50 ميجابكسل + 8 ميجابكسل + 2 ميجابكسل'},
  {EN: '50MP + 8MP + 13MP', AR:'50 ميجابكسل+ 8 ميجابكسل + 13 ميجابكسل'},
  {EN: '50MP + 64MP + 40MP + 13MP', AR:'50 ميجابكسل + 64 ميجابكسل + 40 ميجابكسل + 13 ميجابكسل'},
  {EN: '50+13+12 MP', AR:'50+13+12 ميجابكسل'}, {EN: '48MP + 8MP + 2MP', AR:'48 ميجابكسل + 8 ميجابكسل + 2 ميجابكسل'},
  {EN: '13+5+2MP', AR:'13+5+2 ميجابكسل'}, {EN: '48MP + 2MP + 2MP', AR:'48 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'},
  {EN: '40MP + 32MP + 13MP', AR:'40 ميجابكسل + 32 ميجابكسل + 13 ميجابكسل'},
  {EN: '40MP + 12MP + 12MP', AR:'40 ميجابكسل + 12 ميجابكسل + 12 ميجابكسل'},
  {EN: '16/48MP+ 5MP + 2MP + 2MP', AR:'16/48 ميجابكسل + 5 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'},
  {EN: '108MP + 16MP + 8MP', AR:'108 ميجابكسل + 16 ميجابكسل + 8 ميجابكسل'},
  {EN: '64MP+12MP+12MP', AR:'64 ميجابكسل + 12 ميجابكسل + 12 ميجابكسل'},
  {EN: '64MP + 8MP + 8MP + 2MP', AR:'64 ميجابكسل + 8 ميجابكسل + 8 ميجابكسل + 2 ميجابكسل'},
  {EN: '50MP+50MP+50MP', AR:'50 ميجابكسل + 50 ميجابكسل + 50 ميجابكسل'},
  {EN: '50MP + 2MP', AR:'50 ميجابكسل+ 2 ميجابكسل'},{EN: '50MP + 48MP + 12MP', AR:'50 ميجابكسل + 48 ميجابكسل + 12 ميجابكسل'},
  {EN: '50MP + 13MP + 5MP', AR:'50 ميجابكسل + 13 ميجابكسل + 5 ميجابكسل'}, {EN: '48.0 MP + 5.0 MP + 2.0 MP', AR:'48 ميجابكسل +  ميجابكسل + 2 ميجابكسل'},
  {EN: '12MP+ 108MP+12MP', AR:'12 ميجابكسل + 108 ميجابكسل + 12 ميجابكسل'}, {EN: '64MP + 8MP + 5MP + 5MP', AR:'64 ميجابكسل + 8 ميجابكسل + 5 ميجابكسل + 5 ميجابكسل'},
  {EN: '64MP + 8MP + 5MP', AR:'64 ميجابكسل + 8 ميجابكسل + 5 ميجابكسل'}, {EN: '50MP + 12MP', AR:'50 ميجابكسل + 12 ميجابكسل +'},
  {EN: '48MP + 8MP + 5MP + 2MP', AR:'48 ميجابكسل + 8 ميجابكسل + 5 ميجابكسل + 2 ميجابكسل'}, 
  {EN: '108+8+5+2MP', AR:'108+8+5+2 ميجابكسل'}, {EN: '48MP + 5MP + 2MP + 2MP', AR:'48 ميجابكسل + 5 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'},
  {EN: '64MP + 8MP + 5MP', AR:'64 ميجابكسل + 8 ميجابكسل + 5 ميجابكسل'},{EN: '50MP + 5MP + 2MP', AR:'50 ميجابكسل + 5 ميجابكسل + 2 ميجابكسل'}, 
  {EN: '48 MP + 8 MP + 2 MP + 2 MP', AR:'48 ميجابكسل + 8 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'},
  {EN: '50.0 MP + 5.0 MP + 2.0 MP + 2.0 MP', AR:'50 ميجابكسل + 5 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'},
  {EN: '64MP + 8MP + 2MP + 2MP', AR:'64 ميجابكسل + 8 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'}, 
  {EN: '12 MP + 12 MP + 8MP', AR:'12 ميجابكسل + 12 ميجابكسل + 8 ميجابكسل'}, {EN: 'VGA', AR:'في جي ايه'},
  {EN: '108+8+2+2 MP', AR:'108+8+2+2 ميجابكسل'}, {EN: '50MP + 2MP + 2MP', AR:'50 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'},
  {EN: '108MP + 8MP + 5MP', AR:'108 ميجابكسل + 8 ميجابكسل + 5 ميجابكسل'},
  {EN: '64+8+2MP', AR:'64+8+2 ميجابكسل'}, {EN: '64+12+5+5MP', AR:'64+12+5+5 ميجابكسل'},
  {EN: '64MP + 8MP + 2MP', AR:'64 ميجابكسل + 8 ميجابكسل + 2 ميجابكسل'}, {EN: '50+8+2 MP', AR:'50+8+2 ميجابكسل'},
  {EN: '108+10+12+10 MP', AR:'108+10+12+10 ميجابكسل'}, {EN: '50+8+2+2MP', AR:'50+8+2+2 ميجابكسل'},
  {EN: '13MP + 2MP + 2MP', AR:'13 ميجابكسل + 2 ميجابكسل + 2 ميجابكسل'}, {EN: '108+8+2 MP', AR:'108+8+2 ميجابكسل'},
  {EN: '50MP + 10MP + 12MP', AR:'50 ميجابكسل + 10 ميجابكسل + 12 ميجابكسل'},
  {EN: '12 Megapixels + 12 Megapixels', AR:'12 ميجابكسل + 12 ميجابكسل'}, 
  {EN: '12MP + 12MP + 12MP', AR:'12 ميجابكسل + 12 ميجابكسل + 12 ميجابكسل'},
  {EN: '12 MP + 10 MP', AR:'12 ميجابكسل + 10 ميجابكسل'}, {EN: '13.0 MP + 6.0 MP', AR:'13 ميجابكسل + 6 ميجابكسل'},
  {EN: 'No Primary Camera', AR:'لا توجد كاميرا أساسية'}]

  motionRate:Array<{EN:string, AR:string}>=[{EN: '60 Hz', AR:'60 هيرتز'}, {EN: '50/60 Hz', AR:'50/60 هيرتز'},
   {EN: '50 Hz', AR:'50 هيرتز'}, {EN: '120 Hz', AR:'120 هيرتز'}, {EN: '100 Hz', AR:'100 هيرتز'},
   {EN: '200 Hz', AR:'200 هيرتز'}, {EN: '240 Hz', AR:'240 هيرتز'}, {EN: '100+', AR:'+100'}]  

  value:Array<{EN:string, AR:string}>=[{EN: '-', AR:'-'}, {EN: '2 USD', AR:'2 دولار أمريكي'},
  {EN: '3 USD', AR:'3 دولار أمريكي'}, {EN: '4 USD', AR:'4 دولار أمريكي'}, {EN: '5 USD', AR:'5 دولار أمريكي'},
  {EN: '10 USD', AR:'10 دولار أمريكي'}, {EN: '15 USD', AR:'15 ي'}, {EN: '20 USD', AR:'20 دولار أمريكي'},
  {EN: '25 USD', AR:'25 دولار أمريكي'}, {EN: '30 USD', AR:'30 دولار أمريكي'}, {EN: '35 USD', AR:'35 دولار أمريكي'},
  {EN: '40 USD', AR:'40 دولار أمريكي'}, {EN: '45 USD', AR:'45 دولار أمريكي'}, {EN: '50 USD', AR:'50 دولار أمريكي'},
  {EN: '60 USD', AR:'60 دولار أمريكي'}, {EN: '70 USD', AR:'70 دولار أمريكي'}, {EN: '75 USD', AR:'75 دولار أمريكي'},
  {EN: '100 USD', AR:'100 دولار أمريكي'}, {EN: '150 USD', AR:'150 دولار أمريكي'},
  {EN: '200 USD', AR:'200 دولار أمريكي'}, {EN: '250 USD', AR:'250 دولار أمريكي'},
  {EN: '300 USD', AR:'300 دولار أمريكي'}, {EN: '400 USD', AR:'400 دولار أمريكي'},
  {EN: '450 USD', AR:'450 دولار أمريكي'}, {EN: '500 USD', AR:'500 دولار أمريكي'},
  {EN: '10 GBP', AR:'10 جنيه استرليني'}, {EN: '25 GBP', AR:'25 جنيه استرليني'},
  {EN: '35 GBP', AR:'35 جنيه استرليني'}, {EN: '5 KD', AR:'5 دينار كويتي'},
  {EN: '10 KD', AR:'10 دينار كويتي'}, {EN: '20 KD', AR:'20 دينار كويتي'}, {EN: '30 KD', AR:'30 دينار كويتي'}]


  dk:Array<{EN:string, AR:string}>=[{EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, ]
  d:Array<{EN:string, AR:string}>=[{EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, ]
  a:Array<{EN:string, AR:string}>=[{EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, {EN: '', AR:''}, ]
}