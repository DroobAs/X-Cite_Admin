export interface Order {
  fsId:string, //order id firestore
  id :string, //order id of orders
  state: string,
  purchase_units:any[],
  userId:string,
  userName:string,
  userEmail:string,
  timeCreated:Date,
  paypalMail:string,
  totalPaid:string
}
