export interface Sale_RestaurantTablesModel { 
 Code?:string
 Name?:string
 Description?:string
 FloorId?:string;
 OrderValue?:number;
 TableStatus?:'EMPTY'|'BOOKED'
}